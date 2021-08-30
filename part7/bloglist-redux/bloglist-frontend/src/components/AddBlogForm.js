import { useState } from 'react'
import blogService from '../services/blogs' 
// eslint-disable-next-line no-unused-vars
import Notification from './Notification'

const AddBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')

  const addBlog = (event) => {

    event.preventDefault()
    blogService.addBlog({title, author, url})
      .then(response => setNotificationText(`'${response.title}' has been added successfully`))
      .then(      
        blogService.getAll().then(blogs =>
          props.setBlogs(blogs)
        )
      )
      .catch(error => {
        if(error.toString().includes('401')) {
          setNotificationText('Title is invalid')
          setShowNotification(true)
        }
      })
    setTitle('')
    setAuthor('')
    setUrl('')
    setShowNotification(true)
    
  }

  const giveText = () => {
    let text = ''
    if (showNotification){
      text = notificationText
      setTimeout(()=> {
        setShowNotification(false)
        setNotificationText('')
      }, 3000)
      return text
    } else {
      return ''
    }
  }
  return(
    <>
      <Notification text={giveText()}/>
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