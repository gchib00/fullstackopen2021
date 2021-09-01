import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationsReducer from './reducers/notificationsReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notifications: notificationsReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store