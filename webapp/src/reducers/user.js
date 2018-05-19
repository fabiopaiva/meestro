// @flow

type State = {
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

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
