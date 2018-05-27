// @flow
import React from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import logo from '../../assets/images/logo.png'
import type { State } from '../../types/state'
import { logout as logoutAction } from '../../actions/users'

type Props = {
  isLogged: boolean,
  logout: () => void,
}
const Topbar = ({ isLogged, logout }: Props) => (
  <AppBar position="static">
    <Toolbar>
      <img src={logo} alt="logo" />
      { isLogged && (
        <Button onClick={() => logout()}>
          Logout
        </Button>
      )}
    </Toolbar>
  </AppBar>
)

const mapStateToProps = (state: State) => ({
  isLogged: state.user.isLogged,
})
export default connect(mapStateToProps, { logout: logoutAction })(Topbar)
