import { useState } from 'react'
import blogService from '../services/blogs'

const CommentForm = ({selectedBlog}) => {
  const [comment, setComment] = useState('')
  const submitForm = async (event) => {
    event.preventDefault()
    event.target.value = ''
    await blogService.addComment(selectedBlog, comment)
    selectedBlog.comments = [...selectedBlog.comments, comment]
    setComment('')
  }
  return(
    <div>
      <form onSubmit={submitForm}>
        <input type='text' name='comment' value={comment} onChange={(e)=>setComment(e.target.value)} />
        <button type='submit'>Submit comment</button>
      </form>
      <h5>Comments:</h5>
      <ul>
        {selectedBlog.comments.map(comment => {
          return <li key={comment}>{comment}</li>
        })}
      </ul>
    </div>
  )
}
export default CommentForm