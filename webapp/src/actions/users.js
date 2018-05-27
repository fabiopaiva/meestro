// @flow

import type { Dispatch } from '../types/store'

const API_URL = process.env.REACT_APP_API_ENDPOINT || ''

export const actions = {
  USER_AUTHENTICATE_REQUEST: 'USER_AUTHENTICATE_REQUEST',
  USER_AUTHENTICATE_ERROR: 'USER_AUTHENTICATE_ERROR',
  USER_AUTHENTICATE_SUCCESS: 'USER_AUTHENTICATE_SUCCESS',
  USER_AUTHENTICATE_UNAUTHORIZED: 'USER_AUTHENTICATE_UNAUTHORIZED',
  USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
  USER_LOGOUT_ERROR: 'USER_LOGOUT_ERROR',
}

export const authorize = () => {
  window.location.href = `${process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001'}/auth/spotify`
}

export const authenticate = () => async (dispatch: Dispatch) => {
  dispatch({ type: actions.USER_AUTHENTICATE_REQUEST })
  try {
    const response = await fetch(`${API_URL}/auth/session`, {
      credentials: 'include',
    })
    const data = await response.json()
    if (!response.ok) {
      if (response.status === 401) {
        return dispatch({ type: actions.USER_AUTHENTICATE_UNAUTHORIZED, data })
      }
      throw new Error(data.error || response.statusText || 'Error')
    }
    return dispatch({ type: actions.USER_AUTHENTICATE_SUCCESS, data })
  } catch (error) {
    return dispatch({ type: actions.USER_AUTHENTICATE_ERROR, error })
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({ type: actions.USER_LOGOUT_REQUEST })
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'delete',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(response.statusText || 'Error')
    return dispatch({ type: actions.USER_LOGOUT_SUCCESS })
  } catch (error) {
    return dispatch({ type: actions.USER_LOGOUT_ERROR, error })
  }
}
