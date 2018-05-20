// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './store'
import { Home, LayoutWithAuth } from './screens'

export default () => (
  <Provider store={store}>
    <Router>
      <LayoutWithAuth>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </LayoutWithAuth>
    </Router>
  </Provider>
)
