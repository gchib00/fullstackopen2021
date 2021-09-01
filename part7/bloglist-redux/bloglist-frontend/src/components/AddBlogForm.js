import { useState } from 'react'
import blogService from '../services/blogs' 
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { displayNotification, removeNotification } from '../reducers/notificationsReducer'


const AddBlogForm = () => {
  const dispatch = useDispatch()
  const notificationText = useSelector(state => state.notifications)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const addBlog = (event) => {
    event.preventDefault()
    blogService.addBlog({title, author, url})
      .then(response => dispatch(displayNotification(`'${response.title}' has been added successfully`)))
      .then(      
        blogService.getAll().then(blogs =>
          dispatch(initializeBlogs(blogs))
        )
      )
      .catch(error => {
        if(error.toString().includes('401')) {
          dispatch(displayNotification('Title is invalid'))
          setShowNotification(true)
        }
      })
    setTitle('')
    setAuthor('')
    setUrl('')
    setShowNotification(true)
    
  }

  // eslint-disable-next-line no-unused-vars
  const giveText = () => {
    let text = ''
    if (showNotification){
      console.log('notificationText = ', notificationText)
      text = notificationText
      setTimeout(()=> {
        setShowNotification(false)
        dispatch(removeNotification())
      }, 3000)
      return text
    } else {
      return ''
    }
  }
  giveText()
  return(
    <>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AddBlogForm