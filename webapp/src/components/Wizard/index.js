// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import TopTracksComponent from '../../components/TopTracks'
import TopArtistsComponent from '../../components/TopArtists'
import type { TopTracks, TopArtists } from '../../types/spotify'

const styles = theme => ({
  container: {
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
  stepper: {
    padding: 10,
  },
})

type Props = {
  classes: Object,
}
type State = {
  topTracks: TopTracks,
  topArtists: TopArtists,
  genres: Array<string>,
  activeStep: number,
  warningMessage: ?string,
  anchorEl: ?HTMLButtonElement,
}

class Wizard extends React.Component<Props, State> {
  state = {
    topTracks: [],
    topArtists: [],
    genres: [],
    activeStep: 0,
    warningMessage: null,
    anchorEl: null,
  }

  handleTopTracksChange = (topTracks: TopTracks) => {
    this.setState({ topTracks })
  }

  handleTopArtistsChange = (topArtists: TopArtists) => {
    this.setState({ topArtists })
  }

  handlePrevious = () => {
    const { activeStep } = this.state
    this.setState({ activeStep: activeStep > 0 ? activeStep - 1 : activeStep })
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
      this.setState({ activeStep: activeStep <= 3 ? activeStep + 1 : activeStep })
    }
  }

  handlePopoverClose = () => {
    this.setState({
      warningMessage: null,
    })
  }

  handleGenreToggle = (genre: string) => {
    const { genres } = this.state
    if (!genres.includes(genre)) {
      genres.push(genre)
      this.setState({ genres })
    } else {
      const filtered = genres.filter(item => item !== genre)
      this.setState({ genres: filtered })
    }
  }

  renderGenresList() {
    const { topArtists, genres } = this.state
    const list = new Set()
    topArtists.forEach(artist => artist.genres.forEach(genre => list.add(genre)))

    return (
      <List>
        {Array.from(list).sort().map(genre => (
          <ListItem key={genre} dense button onClick={() => this.handleGenreToggle(genre)}>
            <ListItemText primary={genre} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={() => this.handleGenreToggle(genre)}
                checked={genres.some(item => genre === item)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }

  render() {
    const { classes } = this.props
    const {
      activeStep,
      warningMessage,
      anchorEl, topTracks,
      topArtists,
    } = this.state
    const steps = ['Tracks', 'Artists', 'Genres', 'Done']
    return (
      <div className={classes.container}>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {activeStep === 0 && (
                  <TopTracksComponent
                    title="Choose some songs to create your great playlist"
                    onChange={this.handleTopTracksChange}
                    initial={topTracks}
                  />
                )}
                {activeStep === 1 && (
                  <TopArtistsComponent
                    title="Choose some artists to create your great playlist"
                    onChange={this.handleTopArtistsChange}
                    initial={topArtists}
                  />
                )}
                {activeStep === 2 && this.renderGenresList()}
                {activeStep > 0 && (
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.handlePrevious}
                    className={classes.button}
                  >
                    <Icon>keyboard_arrow_left</Icon>
                    Back
                  </Button>
                )}
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next Step
                  <Icon>keyboard_arrow_right</Icon>
                </Button>
              </StepContent>
            </Step>
          ))}
        </Stepper>
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
      </div>
    )
  }
}

export default withStyles(styles)(Wizard)
