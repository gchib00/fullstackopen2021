// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'

const Navbar = ({ loggedUser, logout }) => {
  const navbarStyle = {
    width: '100%',
    border: '1px solid black',
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
  return(
    <nav style={navbarStyle}>
      <Link to='/' style={{margin: 10}}>blogs</Link>
      <Link to='/users' style={{marginRight: 10}}>users</Link>
      <h4>{loggedUser.name} is logged in. <button onClick={logout}>logout</button></h4>
    </nav>
  )
}
export default Navbar