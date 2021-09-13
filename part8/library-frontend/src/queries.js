import { gql  } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
export const UPDATE_BIRTHDATE = gql`
  mutation updateBirthdate($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`
export const ALL_AUTHORS = gql`
query {
  allAuthors{
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author
    published
  }
}
`