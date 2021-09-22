import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filteredBooks, setFilteredBooks] = useState([])

  const response = useQuery(ALL_BOOKS)
  // if(response.loading){return null}
  if (!props.show || response.loading) {
    return null
  }
  const allBooks = response.data.allBooks
  let genres = []
  allBooks.map(book => book.genres.map(genre => { //populate array with genres
    if (genres.includes(genre)) {return null} //avoids duplicated items
    genres.push(genre)
  }))

  const filterByGenre = (genre) => {
    const arr = []
    allBooks.map(book => {
      if (book.genres.includes(genre)){
        console.log(arr)
        // setFilteredBooks(filteredBooks.concat(book))
        arr.push(book)
      }
    })
    setFilteredBooks(arr)
  }

  const books = (filteredBooks == 0) ? allBooks : filteredBooks
  console.log(books)
  return (
    <div>
      <h1>books</h1>
      <br/>
      <div>
        <h3>genres:</h3>
        {genres.map(genre => {
          return <button key={genre} onClick={() => filterByGenre(genre)}>{genre}</button>
        })}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books