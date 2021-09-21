import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token)
          ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <Authors
        show={page === 'authors'}
      />
      <Books
        show={page === 'books'}
      />
      {(token) 
      ? <NewBook show={page === 'add'}/>
      : <Login setToken={setToken} show={page === 'login'}/>}
    </div>
  )
}

export default App