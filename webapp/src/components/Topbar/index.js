// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import logo from '../../assets/images/logo.png'
import type { State } from '../../types/state'
import { logout as logoutAction } from '../../actions/users'

const styles = () => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  icon: {
    color: '#FFFFFF',
  },
})

type Props = {
  isLogged: boolean,
  logout: () => void,
  classes: Object,
}
const Topbar = ({ isLogged, logout, classes }: Props) => (
  <AppBar position="static">
    <Toolbar className={classes.toolbar}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      { isLogged && (
        <Button onClick={() => logout()}>
          <Tooltip id="tooltip-logout" title="Logout">
            <Icon aria-label="Logout" className={classes.icon}>lock_open</Icon>
          </Tooltip>
        </Button>
      )}
    </Toolbar>
  </AppBar>
)

const mapStateToProps = (state: State) => ({
  isLogged: state.user.isLogged,
})
export default withStyles(styles)(connect(mapStateToProps, { logout: logoutAction })(Topbar))
