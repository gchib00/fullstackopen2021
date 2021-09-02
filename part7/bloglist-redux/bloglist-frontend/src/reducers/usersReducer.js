const usersReducer = (state = [], action) => {
  switch(action.type){
  case('INITIALIZE_USERS'):{
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
    dispatch({type: 'INITIALIZE_USERS', users: users})
  }
}
export default usersReducer