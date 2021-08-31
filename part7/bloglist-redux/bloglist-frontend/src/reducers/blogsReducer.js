
const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'INITIALIZE_BLOGS': {
    const newState = action.blogs
    return newState
  }
  case 'ADD_BLOG': {
    const newState = [...state]
    newState.push(action.blog)
    return newState
  }
  default: 
    return state
  }
}
export const initializeBlogs = (blogs) => {
  return async dispatch => {
    dispatch({type: 'INITIALIZE_BLOGS', blogs: blogs })
  }
}

export default blogReducer