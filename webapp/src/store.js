// @flow
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import type { Store } from './types/store'
import user from './reducers/user'

const reducers = {
  user,
}

export type Reducers = typeof reducers

export default (): Store => createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)
