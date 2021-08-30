import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {  
  const [visible, setVisible] = useState(false)

  Togglable.propTypes = {
    btnLabel: PropTypes.string.isRequired
  }

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    setVisible(false)
  }, [props.blogs])

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.btnHide ? props.btnHide : 'cancel'}</button>
      </div>
    </div>
  )
}

export default Togglable
