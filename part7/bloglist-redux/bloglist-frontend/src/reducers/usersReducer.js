const usersReducer = (state = [], action) => {
  switch(action.type){
  case('LOGGED_USER'):{
    const newState = action.users
    return newState
  }
  default: {
    return state
  }
  }
}
export const initializeUsers = (users) => {
  return async dispatch => {
    dispatch({type: 'LOGGED_USER', users: users})
  }
}
export default usersReducer