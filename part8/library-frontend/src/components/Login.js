import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({setToken, show}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [login, response] = useMutation(LOGIN, {    
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
  })

  useEffect(() => {
    if (response.data){
      const token = response.data.login.value
      console.log('token =', token)
      setToken(token)
      localStorage.setItem('userToken', token)
    }
  }, [response.data, setToken],)

  if (!show) {
    return null
  }
  
  const submitLogin = async (event) => {
    event.preventDefault()
    await login({ variables: { username: username, password: password } })
  }
  // console.log('response =', response.data)

  return(
    <>
    <form onSubmit={(event) => submitLogin(event)} style={{margin: 30}}>
      <div>
        Username: 
        <input type='text' value={username} onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
        Password: 
        <input type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type='submit'>Submit</button>
    </form>
    <h4>{errorMessage}</h4>
    </>
  )
}

export default Login