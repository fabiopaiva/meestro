// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { authorize, authenticate } from '../../actions/users'
import type { UserState } from '../../reducers/user'
import type { State } from '../../types/state'
import LoadingIcon from '../../components/LoadingIcon'


const styles = theme => ({
  auth: {
    height: 'calc(100% - 56px)', // 56px is the expected size of topbar
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
})

type AuthProps = ContextRouter & {
  user: UserState,
  authenticate: () => void,
  authorize: () => void,
  classes: Object,
}

class Auth extends React.PureComponent<AuthProps> {
  componentDidMount() {
    this.props.authenticate()
  }

  handleBtnClick = () => {
    authorize()
  }

  render() {
    const { classes, user } = this.props

    return (
      <Grid
        container
        className={classes.auth}
        alignItems="center"
        direction="row"
        justify="center"
      >
        {(user.isFetching) && <LoadingIcon />}
        {!user.isFetching && !user.isLogged && (
          <Button variant="raised" color="primary" onClick={this.handleBtnClick}>
            <Icon className={classes.icon}>lock</Icon>
            Login with Spotify
          </Button>
        )}
        {user.error && <strong>{user.error.message}</strong>}
      </Grid>
    )
  }
}

const mapStateToProps = (state: State) => ({
  user: state.user,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, {
  authenticate,
})(Auth)))
