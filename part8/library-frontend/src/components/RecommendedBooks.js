import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const RecommendedBooks = ({show, loggedUser}) => {
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    if (loggedUser){
      try{
        setSelectedGenre(loggedUser.me.favoriteGenre)
      } catch (err) {}
    }
  }, [loggedUser])

  const response = useQuery(BOOKS_BY_GENRE, {variables: {selectedGenre: selectedGenre}})
  
  if (!show){return null}
  return (
    <div>
      <h2>Recommended books for you:</h2>
      <br />
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {response.data.allBooks.map(book => 
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

export default RecommendedBooks