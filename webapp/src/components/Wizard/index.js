// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import TopTracksComponent from '../../components/TopTracks'
import type { TopTracks } from '../../types/spotify'

const styles = theme => ({
  container: {
    margin: theme.spacing.unit,
    flex: 1,
  },
  controls: {
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 2,
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
})

type Props = {
  classes: Object,
}
type State = {
  topTracks: TopTracks,
  activeStep: number,
  warningMessage: ?string,
  anchorEl: ?HTMLButtonElement
}

class Wizard extends React.PureComponent<Props, State> {
  state = {
    topTracks: [],
    activeStep: 0,
    warningMessage: null,
    anchorEl: null,
  }

  handleTopTracksChange = (topTracks: TopTracks) => {
    this.setState({ topTracks })
  }

  handleNext = (event: Event) => {
    const { activeStep, topTracks, anchorEl } = this.state
    if (!anchorEl) {
      // $FlowFixMe Flow doesn't understand event.target returns a button html element
      this.setState({ anchorEl: event.target })
    }
    if (topTracks.length === 0) {
      this.setState({ warningMessage: 'Select at least one track' })
    } else {
      this.setState({ activeStep: activeStep <= 2 ? activeStep + 1 : activeStep })
    }
  }

  handlePopoverClose = () => {
    this.setState({
      warningMessage: null,
    });
  };

  render() {
    const { classes } = this.props
    const { activeStep, warningMessage, anchorEl } = this.state
    const steps = ['Select tracks', 'Select genres', 'Get your playlist']
    return (
      <div className={classes.container}>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        { activeStep === 0 && (
          <TopTracksComponent
            title="Choose some songs to create your great playlist"
            onChange={this.handleTopTracksChange}
          />
        )}
        <Grid container className={classes.controls}>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleNext}
            className={classes.button}
          >
            Next Step
            <Icon>keyboard_arrow_right</Icon>
          </Button>
          <Popover
            open={!!warningMessage}
            anchorEl={anchorEl}
            onClose={this.handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Typography className={classes.typography}>
              {warningMessage}
            </Typography>
          </Popover>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Wizard)
