// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import configureStore from './store'
import { Home, LayoutWithAuth } from './screens'

const store = configureStore()

export default () => (
  <Provider store={store}>
    <Router>
      <LayoutWithAuth>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </LayoutWithAuth>
    </Router>
  </Provider>
)
