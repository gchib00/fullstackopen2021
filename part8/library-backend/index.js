const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author');
const User = require('./models/users')
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


// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
//  * However, for simplicity, we will store the author's name in connection with the book
// */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]
// const addAuthorsToDB = () => {
//   authors.forEach(author => {
//     const newAuthor = new Author({...author})
//     return newAuthor.save()
//   })
// }
// addAuthorsToDB()

// const addBooksToDB = async () => {
//   const assignAuthor = async (authorName) => {
//     const author = await Author.findOne({name: authorName})
//     return author
//   }
//   books.forEach(async (book) => {
//     const newBook = new Book({...book, author: await assignAuthor(book.author)})
//     newBook.save()
//   })
// }
// addBooksToDB()

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
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  },
  type User {
    username: String!
    favoriteGenre: String!
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
      if (JSON.stringify(args) === '{}'){return Book.find({})} //args not provided (default)
      let newArr = await Book.find({})
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
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'fakepassword' ) {
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