// @flow

import type { Dispatch } from '../types/store'
import { actions as userActions } from './users'

const API_URL = process.env.REACT_APP_API_ENDPOINT || ''

export const actions = {
  TOP_TRACKS_REQUEST: 'TOP_TRACKS_REQUEST',
  TOP_TRACKS_ERROR: 'TOP_TRACKS_ERROR',
  TOP_TRACKS_SUCCESS: 'TOP_TRACKS_SUCCESS',
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
    return dispatch({ type: actions.TOP_TRACKS_SUCCESS, data: data.topTracks })
  } catch (error) {
    return dispatch({ type: actions.TOP_TRACKS_ERROR, error })
  }
}
