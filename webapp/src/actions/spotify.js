// @flow

import { actions as userActions } from './users'
import type { Dispatch } from '../types/store'
import type { Params as RecommendationsParams } from '../reducers/recommendations'
import type { Track } from '../types/spotify'

const API_URL = process.env.REACT_APP_API_ENDPOINT || ''

export const actions = {
  TOP_TRACKS_REQUEST: 'TOP_TRACKS_REQUEST',
  TOP_TRACKS_ERROR: 'TOP_TRACKS_ERROR',
  TOP_TRACKS_SUCCESS: 'TOP_TRACKS_SUCCESS',
  TOP_ARTISTS_REQUEST: 'TOP_ARTISTS_REQUEST',
  TOP_ARTISTS_ERROR: 'TOP_ARTISTS_ERROR',
  TOP_ARTISTS_SUCCESS: 'TOP_ARTISTS_SUCCESS',
  RECOMMENDATIONS_REQUEST: 'RECOMMENDATIONS_REQUEST',
  RECOMMENDATIONS_ERROR: 'RECOMMENDATIONS_ERROR',
  RECOMMENDATIONS_SUCCESS: 'RECOMMENDATIONS_SUCCESS',
  PLAYLIST_CREATE_REQUEST: 'PLAYLIST_CREATE_REQUEST',
  PLAYLIST_CREATE_ERROR: 'PLAYLIST_CREATE_ERROR',
  PLAYLIST_CREATE_SUCCESS: 'PLAYLIST_CREATE_SUCCESS',
}

export const fetchTopTracks = () => async (dispatch: Dispatch) => {
  dispatch({ type: actions.TOP_TRACKS_REQUEST })
  try {
    const response = await fetch(`${API_URL}/spotify/top-tracks`, {
      credentials: 'include',
    })
    const data = await response.json()
    if (!response.ok) {
      if (response.status === 401) {
        return dispatch({ type: userActions.USER_AUTHENTICATE_UNAUTHORIZED, data })
      }
      throw new Error(data.error || response.statusText || 'Error')
    }
    return dispatch({ type: actions.TOP_TRACKS_SUCCESS, data })
  } catch (error) {
    return dispatch({ type: actions.TOP_TRACKS_ERROR, error })
  }
}

export const fetchTopArtists = () => async (dispatch: Dispatch) => {
  dispatch({ type: actions.TOP_ARTISTS_REQUEST })
  try {
    const response = await fetch(`${API_URL}/spotify/top-artists`, {
      credentials: 'include',
    })
    const data = await response.json()
    if (!response.ok) {
      if (response.status === 401) {
        return dispatch({ type: userActions.USER_AUTHENTICATE_UNAUTHORIZED, data })
      }
      throw new Error(data.error || response.statusText || 'Error')
    }
    return dispatch({ type: actions.TOP_ARTISTS_SUCCESS, data })
  } catch (error) {
    return dispatch({ type: actions.TOP_ARTISTS_ERROR, error })
  }
}

export const fetchRecommendations =
(params: RecommendationsParams) => async (dispatch: Dispatch) => {
  dispatch({ type: actions.RECOMMENDATIONS_REQUEST, params })
  try {
    const { artists, tracks, genres } = params
    const response = await fetch(`${API_URL}/spotify/recomendations`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        artists: artists.map(artist => artist.id),
        tracks: tracks.map(track => track.id),
        genres,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      if (response.status === 401) {
        return dispatch({ type: userActions.USER_AUTHENTICATE_UNAUTHORIZED, data })
      }
      throw new Error(data.error || response.statusText || 'Error')
    }
    return dispatch({ type: actions.RECOMMENDATIONS_SUCCESS, data })
  } catch (error) {
    return dispatch({ type: actions.RECOMMENDATIONS_ERROR, error })
  }
}

export const createPlaylist =
(tracks: Array<Track>) => async (dispatch: Dispatch) => {
  dispatch({ type: actions.PLAYLIST_CREATE_REQUEST, tracks })
  try {
    const response = await fetch(`${API_URL}/spotify/create-playlist`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        tracks: tracks.map(track => track.uri),
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      if (response.status === 401) {
        return dispatch({ type: userActions.USER_AUTHENTICATE_UNAUTHORIZED })
      }
      throw new Error(response.statusText || 'Error')
    }
    return dispatch({ type: actions.PLAYLIST_CREATE_SUCCESS, data })
  } catch (error) {
    return dispatch({ type: actions.PLAYLIST_CREATE_ERROR, error })
  }
}
