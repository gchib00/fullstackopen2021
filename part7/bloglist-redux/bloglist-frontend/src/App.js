/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import usersService from './services/users'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.loggedUser)
  
  const logout = () => {
    window.localStorage.setItem('user', null)
    dispatch(setUser(null))
  }
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    dispatch(setUser(loggedUser))
    try {blogService.setToken(loggedUser.token)}
    catch{error=>console.error(error)}
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )  
    usersService.getAll().then(users => {
      return dispatch(initializeUsers(users))
    }
    )
  }, [])
  if (user===null || user===undefined){
    return <Login />
  }
  return (
    <Router>
      <div>
        <Navbar loggedUser={user} logout={logout} />
        <h2>blog app</h2>
        <br />
        <Notification />
        <Switch>
          <Route path='/blogs/:id'>
            <BlogView />
          </Route>
          <Route path='/users/:id'>
            <UserView />
          </Route>
          <Route path='/users'>
            <Users />
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