import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const UserHistory = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const selectedUser = users.find(user => user.id == id)
  
  if(selectedUser == undefined){
    return null
  }
  return(
    <div>
      <h3>{selectedUser.name}</h3>
      <ul>
        {blogs.map(blog => {
          if (blog.user.name == selectedUser.name){
            return <li key={blog.title}>{blog.title}</li>
          }
          return null
        })}
      </ul>
    </div>
  )

}
export default UserHistory