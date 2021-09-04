import blogServices from '../services/blogs'
// eslint-disable-next-line no-unused-vars
import CommentForm from './CommentForm'
import { initializeBlogs } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const allBlogs = useSelector(state => state.blogs)
  const generateUniqueID = (title) => {
    const id = title.replace(/\s/g, '')
    return id
  }
  const blog = allBlogs.find(blog => generateUniqueID(blog.title) === id)

  const incrementLikes = (blog) => {
    blogServices.updateBlog(blog)
      .then(blogServices.getAll().then(blogs => {
        dispatch(initializeBlogs(blogs))
      }))
  }
  const deleteBlog = (blog) => {
    if(window.confirm(`Are you sure you want to delete ${blog.title} from the list?`)){
      blogServices.deleteBlog(blog)
        .then(blogServices.getAll().then(blogs => {
          dispatch(initializeBlogs(blogs))
        }))
    }
  }
  if (blog == undefined) {
    return <h3>Blog not found</h3>
  }
  return(
    <>
      <div>
        <h1>{blog.title} by {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes</p>
        <div>
          <p>added by {blog.user.name}</p>
          <button onClick={()=>incrementLikes(blog)}>Like</button>
        </div>
        <br/>
        <button onClick={()=>deleteBlog(blog)}>Delete</button>
      </div>
      <br/>
      <CommentForm selectedBlog={blog} />
    </>
  )
}

export default BlogView