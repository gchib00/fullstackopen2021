import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import RecommendedBooks from './components/RecommendedBooks'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { GET_USER, BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken'))
  const [loggedUser, setLoggedUser] = useState({})
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    window.location.reload()
  }

  const loggedUserData = useQuery(GET_USER)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(book => book.title).includes(object.title)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log('dataInSTore = ', dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
      setLoggedUser(loggedUserData.data)      
  }, [loggedUserData.data, token])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token)
          ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
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
      ? <>
        <NewBook show={page === 'add'}/>
        <RecommendedBooks show={page === 'recommended'} loggedUser={loggedUser}/>
        </>
      : <Login setToken={setToken} show={page === 'login'}/>}
    </div>
  )
}

export default App