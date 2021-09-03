import { useSelector } from 'react-redux'

const Users = (props) => {
  const blogs = useSelector(state => state.blogs)
  const usersList = props.users
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
      <table style={tableStyle}>      
        <tr>
          <th style={{border: '1px solid black'}}>User</th>
          <th style={{border: '1px solid black'}}>Number of blogs</th>
        </tr>
        {usersList.map(user => (
          <tr>
            <td key={user.id}>{user.name}</td>  
            <td>{getBlogsQuanitity(user)}</td>
          </tr>)
        )}
      </table>
    </div>
  )
}
export default Users