// eslint-disable-next-line no-unused-vars
import Togglable from './Togglable'
import blogServices from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const incrementLikes = (blog, setBlogs) => {
  blogServices.updateBlog(blog)
    .then(blogServices.getAll().then(blogs => {
      setBlogs(blogs)
    }))
}
const deleteBlog = (blog, setBlogs) => {
  if(window.confirm(`Are you sure you want to delete ${blog.title} from the list?`)){
    blogServices.deleteBlog(blog)
      .then(blogServices.getAll().then(blogs => {
        setBlogs(blogs)
      }))
  }
}
const generateUniqueID = (title) => {
  const id = title.replace(/\s/g, '')
  return id
}

const Blog = ({blog, setBlogs}) => (
  <div style={blogStyle} id={generateUniqueID(blog.title)} className='blog'>
    <div className='blogTitle'>
      {blog.title} {blog.author}
    </div>
    <Togglable btnLabel='view' btnHide='hide'>
      <div>
        {blog.url}
        <div id='likes'>
          likes: {blog.likes}<button onClick={()=>incrementLikes(blog, setBlogs)} id='likesBtn'>like</button>
        </div>
        {blog.author}
        <br/><br/> 
        <button onClick={()=>deleteBlog(blog, setBlogs)} id='deleteBtn'>delete</button>
      </div>
    </Togglable>
  </div>  
)

export default Blog