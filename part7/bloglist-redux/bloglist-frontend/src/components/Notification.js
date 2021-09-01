import { useSelector } from 'react-redux'

const Notification = () => {
  const text = useSelector(state => state.notifications)
  const style_positive = {
    minWidth: '500px',
    maxWidth: '800px',
    height: '50px',
    border: '4px grey solid',
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  }
  if (text === '' ||text === null || text === undefined) { //dont show component if there is no text
    return null 
  }
  return(
    <div style={style_positive}>
      <p>{text}</p>
    </div>
  )
}

export default Notification