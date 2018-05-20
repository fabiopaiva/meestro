// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import lightBlue from '@material-ui/core/colors/lightBlue'
import type { UserState } from '../../reducers/user'
import { Auth } from '../'
import Topbar from '../../components/Topbar'
import './LayoutWithAuth.css'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
  },
})

type Props = {
  children: React.Node,
  user: UserState
}

const LayoutWithAuth = ({ children, user }: Props) => (
  <MuiThemeProvider theme={theme}>
    <Topbar />
    {!user.isLogged ? <Auth /> : children}
  </MuiThemeProvider>
)

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(LayoutWithAuth)
