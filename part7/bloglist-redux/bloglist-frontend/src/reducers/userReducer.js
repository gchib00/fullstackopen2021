
const userReducer = (state = {}, actions) => {
  switch(actions.type){
  case 'LOGGED_USER':{
    const newState = actions.user
    return newState
  }
  default: {return state}
  }
}
export const setUser = (user) => {
  return async dispatch => {
    dispatch({type: 'LOGGED_USER', user: user})
  }
}
export default userReducer