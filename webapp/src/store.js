// @flow
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import type { Store } from './types/store'
import user from './reducers/user'
import topTracks from './reducers/topTracks'
import topArtists from './reducers/topArtists'

const reducers = {
  user,
  topTracks,
  topArtists,
}

export type Reducers = typeof reducers

export default (): Store => createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)
