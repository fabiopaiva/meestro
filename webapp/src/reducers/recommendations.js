// @flow
import { actions } from '../actions/spotify'
import type { Action } from '../types/action'
import type { Recommendations, Artist, Track } from '../types/spotify'

export type Params = {
  artists: Array<Artist>,
  tracks: Array<Track>,
  genres: Array<string>,
}

export type RecommendationsState = {
  +isFetching: boolean,
  +isLoaded: boolean,
  +data: Recommendations,
  +error?: Error,
  +params: Params,
  +playlist: ?{
    +external_urls: {
      +spotify: string,
    }
  }
}

const initialState = {
  isLoaded: false,
  isFetching: false,
  data: [],
  params: {
    artists: [],
    tracks: [],
    genres: [],
  },
  playlist: null,
}

export default (state: RecommendationsState = initialState, action: Action) => {
  switch (action.type) {
    case actions.RECOMMENDATIONS_REQUEST:
      return { ...state, isFetching: true, params: action.params }
    case actions.RECOMMENDATIONS_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case actions.RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        isLoaded: true,
      }
    case actions.PLAYLIST_CREATE_SUCCESS:
      return {
        ...state,
        playlist: action.data,
      }
    default:
      return state
  }
}
