// @flow
import { actions } from '../actions/users'
import type { Action } from '../types/action'

export type UserState = {
  +isLogged: boolean,
  +isFetching: boolean,
  +data?: {
    +id: string,
    +name: string,
  },
  +error?: Error,
}

const initialState = {
  isLogged: false,
  isFetching: false,
}

export default (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case actions.USER_AUTHENTICATE_REQUEST:
      return { ...state, isFetching: true }
    case actions.USER_AUTHENTICATE_ERROR:
      return { ...state, isFetching: false, error: action.error }
    case actions.USER_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        isLoaded: true,
        isLogged: true,
      }
    case actions.USER_AUTHENTICATE_UNAUTHORIZED:
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        data: undefined,
        isLoaded: false,
        isLogged: false,
        isFetching: false,
      }
    default:
      return state
  }
}
