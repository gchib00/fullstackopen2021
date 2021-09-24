const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author');
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'FAKE_SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://fullstack-library-app:000@cluster0.j7uur.mongodb.net/library-app?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  },
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  },
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  },
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  },
  type Token {
    value: String!
  },
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (JSON.stringify(args) === '{}'){return Book.find({}).populate('author')} //args not provided (default)
      let newArr = await Book.find({}).populate('author')
      if (args.author !== undefined && args.genre !== undefined) {
        newArr = newArr.filter(book => book.author.name === args.author)
        newArr = newArr.filter(book => book.genres.includes(args.genre))
        return newArr
      }
      if (args.author !== undefined) {
        newArr = newArr.filter(book => book.author.name === args.author)
        return newArr
      }
      newArr = newArr.filter(book => book.genres.includes(args.genre))
      return newArr
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if (!currentUser){
        throw new AuthenticationError("You must be logged in to add new books!")
      }
      const book = await Book.find({title: args.title})
      if(book.length > 0){
        throw new UserInputError("Book by this name has already been added!", {invalidArgs: args})
      }
      const assignAuthor = async (authorName) => {
        let author = await Author.find({name: authorName})
        if (author.length > 0){
          return author[0]._id
        } //if existing author is not found, create a new one:
        const newAuthor = new Author({name: authorName})
        await newAuthor.save()
        author = await Author.findOne({name: authorName})
        return author
      }
      const newBook = new Book({...args, author: await assignAuthor(args.author)})
      newBook.save()
      return newBook
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser){
        throw new AuthenticationError("You must be logged in to edit author information!")
      }
      const author = await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo})
      if (author == null){
        throw new UserInputError("Author not found", {invalidArgs: args})
      }
      return await Author.findOne({name: args.name})
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'fakepass' ) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const author = await Author.findById(root.id)
      const books = await Book.find({})
      const newArr = books.filter(book => book.author.toString() == root.id)
      return newArr.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }

})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})