import { useState, useEffect } from 'react'
import loginService from '../services/login' 
// eslint-disable-next-line no-unused-vars
import Notification from './Notification'

const Login = (props) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(user))
      props.setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
  }
  useEffect(() => { //functions as componentWillUnmount. It's necessary to avoid memory leak issue caused by setTimeout when component is unmounted
    return () => {
      setErrorMessage(null)
    }
  }, [])
  const giveText = () => {
    if(errorMessage === 'Wrong credentials') {
      let text = errorMessage
      setTimeout(() => { 
        setErrorMessage(null)
      }, 3000)
      return text
    }
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <Notification text={giveText()} />
    </div>  
  )
}

export default Login