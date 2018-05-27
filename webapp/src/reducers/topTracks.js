// @flow
import { actions } from '../actions/spotify'
import type { Action } from '../types/action'
import type { TopTracks } from '../types/spotify'

export type TopTracksState = {
  +isFetching: boolean,
  +isLoaded: boolean,
  +data: TopTracks,
  +error?: Error,
}

const initialState = {
  isLoaded: false,
  isFetching: false,
  data: [],
}

export default (state: TopTracksState = initialState, action: Action) => {
  switch (action.type) {
    case actions.TOP_TRACKS_REQUEST:
      return { ...state, isFetching: true }
    case actions.TOP_TRACKS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case actions.TOP_TRACKS_SUCCESS:
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
