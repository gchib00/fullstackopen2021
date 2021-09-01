/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Users from './components/Users'
import blogService from './services/blogs'
import usersService from './services/users'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const [user, setUser] = useState('')
  console.log('users:', users)

  const logout = () => {
    window.localStorage.setItem('user', null)
    setUser(null)
  }
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    setUser(loggedUser)
    try {blogService.setToken(loggedUser.token)}
    catch{error=>console.error(error)}
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )  
    usersService.getAll().then(users => {
      console.log('users returned from usersService', users)
      return dispatch(initializeUsers(users))
    }
    )
  }, [])
  if (user===null || user===undefined){
    return(
      <Login 
        user={user} 
        setUser={setUser} 
      />)
  }
  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <h4>{user.name} is logged in. <button onClick={logout}>logout</button></h4>
        <Notification />
        <Switch>
          <Route path='/users'>
            <Users users={users} />
          </Route>
          <Route path='/'>
            <Togglable btnLabel='Add Blog' blogs={blogs}>
              <AddBlogForm />
            </Togglable>
            <br />
            {blogs.map(blog =>
              <Blog key={blog.title} blog={blog}/>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
export default App