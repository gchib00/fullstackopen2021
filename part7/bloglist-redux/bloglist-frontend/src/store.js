import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  blogs: blogsReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store