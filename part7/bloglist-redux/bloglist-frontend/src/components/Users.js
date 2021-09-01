

const Users = (props) => {
  const usersList = props.users
  if (usersList == undefined){
    return null
  }
  return(
    <div>
      <h3>Registered users:</h3>
      <ul>
        {usersList.map(user => 
          <li key={user.id}>{user.name}</li>  
        )}
      </ul>
    </div>
  )
}
export default Users