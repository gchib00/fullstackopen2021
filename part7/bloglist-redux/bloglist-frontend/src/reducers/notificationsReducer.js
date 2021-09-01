
const notificationsReducer = (state = '', action) => {
  switch(action.type) {
  case 'SHOW_TEXT': {
    const newState = action.text
    return newState
  }
  case 'HIDE_TEXT': {
    return ''
  }
  default: {
    return state
  }
  }
}

export const displayNotification = (text) => {
  return async dispatch => {
    dispatch({type: 'SHOW_TEXT', text: text})
  }
}
export const removeNotification = () => {
  return async dispatch => {
    dispatch({type: 'HIDE_TEXT'})
  }
}
export default notificationsReducer