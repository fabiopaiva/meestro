// @flow
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux'
import user from './reducers/user'

export default createStore(
  combineReducers({
    user,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
