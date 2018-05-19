// @flow
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import logo from './logo.png'

export default () => (
  <Provider store={store}>
    <img src={logo} alt="logo" />
  </Provider>
)
