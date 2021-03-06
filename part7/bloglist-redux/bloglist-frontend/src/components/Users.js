/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const usersList = useSelector(state => state.users)
  const tableStyle = {
    minWidth: '400px',
    border: '1px solid black',
    textAlign: 'center'
  }
  const getBlogsQuanitity = (user) => {
    let numberOfBlogs = 0
    blogs.map(blog => {
      if(blog.user.username === user.username){
        numberOfBlogs+=1
      }
    })
    return numberOfBlogs
  } 
  if (usersList == undefined){
    return null
  }
  return(
    <div>
      <h3>Registered users:</h3>
      <Table style={tableStyle}>      
        <thead>
          <tr>
            <th style={{border: '1px solid black'}}>User</th>
            <th style={{border: '1px solid black'}}>Number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>  
              <td>{getBlogsQuanitity(user)}</td>
            </tr>)
          )}
        </tbody>
      </Table>
    </div>
  )
}
export default Users