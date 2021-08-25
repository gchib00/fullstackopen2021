import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const getStyle = () => {
    if (notification === ''){
      return {
        minHeight: '88px',
        visibility: 'hidden'
      }
    } else {
      return {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    }
  }
  return (
    <div style={getStyle()}>
      <h2>{notification}</h2>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notificationReducer
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification