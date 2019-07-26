import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Auth from './Auth'
import Message from './Message'
import Channel from './Channel'
import Type from './Type'

const AppReducer = combineReducers({
   Auth,
  Message,
 // Channel,
  Type,
  router: routerReducer
})

export default AppReducer
