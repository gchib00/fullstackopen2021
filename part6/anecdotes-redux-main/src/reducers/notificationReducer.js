const initialState = ''
let timeoutID = 0

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE_ADDED': {
      const newState=`You voted for: ${action.anecdoteContent}`
      return newState
    } 
    case 'HIDE_NOTIFICATION': {
      return ''
    }
    default: 
      return state
  }
}

export const notifyVoteSuccess = (content, timeout) => {
  return async dispatch => {
    dispatch({type: 'VOTE_ADDED', anecdoteContent: content})
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({type: 'HIDE_NOTIFICATION'})
    }, timeout)  
  }
}
export const hideNotification = () => {
  return{
    type: 'HIDE_NOTIFICATION'
  } 
}


export default anecdoteReducer