/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

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
      setBlogs(blogs)
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
    <div>
      <h2>blogs</h2>
      <h4>{user.name} is logged in. <button onClick={logout}>logout</button></h4>
      <Togglable btnLabel='Add Blog' blogs={blogs}>
        <AddBlogForm user={user} setBlogs={setBlogs}/>
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.title} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App