const initialFilter = ''

const filterReducer = (state = initialFilter, action) => {
  switch(action.type) {
    case 'FILTER': {
      const newState = action.letter
      return newState
    }
    default: 
      return state
  }
}

export const addToFilter = (letter) => {
  return{
    type: 'FILTER',
    letter: letter
  }
}

export default filterReducer