// @flow

export type UserState = {
  +isLogged: boolean,
  +data?: {
    +id: string
  }
}

type Action = {
  +type: string,
};

const initialState = {
  isLogged: false,
}

export default (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
