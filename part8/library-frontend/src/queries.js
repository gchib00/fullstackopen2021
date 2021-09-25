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
      author {
        name
      }
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
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
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
      published
      genres
      author{
        name
      }
    }
  }
`
export const BOOKS_BY_GENRE = gql`
  query allBooks($selectedGenre: String){
    allBooks(genre: $selectedGenre) {
      title
      published
      author {
        name
      }
    }
  }
`
export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
