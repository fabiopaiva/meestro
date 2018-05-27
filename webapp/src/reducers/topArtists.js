// @flow
import { actions } from '../actions/spotify'
import type { Action } from '../types/action'
import type { TopArtists } from '../types/spotify'

export type TopArtistsState = {
  +isFetching: boolean,
  +isLoaded: boolean,
  +data: TopArtists,
  +error?: Error,
}

const initialState = {
  isLoaded: false,
  isFetching: false,
  data: [],
}

export default (state: TopArtistsState = initialState, action: Action) => {
  switch (action.type) {
    case actions.TOP_ARTISTS_REQUEST:
      return { ...state, isFetching: true }
    case actions.TOP_ARTISTS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case actions.TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        isLoaded: true,
      }
    default:
      return state
  }
}
