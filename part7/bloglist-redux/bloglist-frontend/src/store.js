import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationsReducer from './reducers/notificationsReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  loggedUser: userReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store