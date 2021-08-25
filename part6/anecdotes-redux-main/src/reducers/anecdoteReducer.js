import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_VOTE': {
      const newState=[...state]
      const votedAnecdote = newState.find(anecdote => anecdote.id === action.id)
      votedAnecdote.votes += 1
      return [...newState]
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.data ]
    }
    default: 
      return state
  }
}
export const addVote = (id) => {
  return async dispatch => {
    await anecdoteService.addVote(id)
    dispatch({type: 'ADD_VOTE',id: id})
  }
}
export const addAnecdote = (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const newObj = {
    content: content,
    id: getId(),
    votes: 0
  }
  return async dispatch => {
    await anecdoteService.addAnecdote(newObj)
    dispatch({type: 'ADD_ANECDOTE', data: newObj})
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const list = await anecdoteService.getAll()
    list.forEach(anecedote => {
      dispatch({type: 'ADD_ANECDOTE', data: anecedote})
    })
  }
}

export default anecdoteReducer