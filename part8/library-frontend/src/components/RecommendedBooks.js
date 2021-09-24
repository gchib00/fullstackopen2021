import React, {useState, useEffect} from 'react'
import { useLazyQuery } from '@apollo/client'
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

  // const response = useQuery(BOOKS_BY_GENRE, {variables: {selectedGenre: selectedGenre}})


  const [getRecommendedList, response] = useLazyQuery(BOOKS_BY_GENRE)
  const showRecommendations = () => {
    getRecommendedList({variables: {selectedGenre: selectedGenre}})
  }
  useEffect(() => {
    showRecommendations()
  }, [show])

  let recommendedList = []
  try {
    recommendedList = response.data.allBooks
  } catch {}


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
          {recommendedList.map(book => 
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