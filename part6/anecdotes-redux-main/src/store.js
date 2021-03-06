import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { combineReducers, createStore, applyMiddleware } from 'redux'

const reducer = combineReducers({
  anecdoteReducer,
  notificationReducer,
  filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store