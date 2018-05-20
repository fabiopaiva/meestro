// @flow
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logo from '../../assets/images/logo.png'

export default () => (
  <AppBar position="static">
    <Toolbar>
      <img src={logo} alt="logo" />
    </Toolbar>
  </AppBar>
)
