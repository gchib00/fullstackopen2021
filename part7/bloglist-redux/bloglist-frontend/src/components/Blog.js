// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const generateUniqueID = (title) => {
    const id = title.replace(/\s/g, '')
    return id
  }
  return(
    <div style={blogStyle} id={generateUniqueID(blog.title)} className='blog'>
      <Link to={`/blogs/${generateUniqueID(blog.title)}`} className='blogTitle'>
        {blog.title} {blog.author}
      </Link>
    </div>  
  )
}

export default Blog