// @flow
import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  auth: {
    height: 'calc(100% - 56px)', // 56px is the expected size of topbar
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
})

export default withStyles(styles)(({ classes }) => (
  <Grid
    container
    className={classes.auth}
    alignItems="center"
    direction="row"
    justify="center"
  >
    <Button variant="raised" color="primary">
      <Icon className={classes.icon}>lock</Icon>
      Login with Spotify
    </Button>
  </Grid>

))
