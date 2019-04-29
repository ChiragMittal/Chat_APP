import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Auth from './Auth'
import Book from './Book'

const AppReducer = combineReducers({
  // Auth,
  Book,
  router: routerReducer
})

export default AppReducer
