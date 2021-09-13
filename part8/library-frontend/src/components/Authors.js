import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHDATE } from '../queries'

const Authors = (props) => {
  const [authorName, setAuthorName] = useState('')
  const [newDate, setNewDate] = useState('')
  const [updateBirthdate] = useMutation(UPDATE_BIRTHDATE, {refetchQueries: [{ query: ALL_AUTHORS }]})

  const response = useQuery(ALL_AUTHORS)
  if (response.loading){return null}
  const authors = response.data.allAuthors

  const updateAuthorDate = (event) => {
    event.preventDefault()
    const searchedAuthor = authors.find(author => author.name === authorName)
    if (searchedAuthor){
      updateBirthdate({variables: {name: authorName, setBornTo: Number(newDate)}})
    } else {
      alert('Author not found!')
    }
  }


  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <br />
      <div>
        <form onSubmit={updateAuthorDate}>       
          <div>
            Author:
            <input type='text' value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
          </div>
          <div>
            Change Birthdate:
            <input type='text' value={newDate} onChange={(e) => setNewDate(e.target.value)}/>
          </div>
          <div>
            <button type='submit'>update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
