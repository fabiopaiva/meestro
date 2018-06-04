// @flow
import React from 'react'
import { connect } from 'react-redux'
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
import CircularProgress from '@material-ui/core/CircularProgress'
import TopTracks from '../../components/TopTracks'
import TopArtists from '../../components/TopArtists'
import Recommendations from '../../components/Recommendations'
import { createPlaylist } from '../../actions/spotify'
import type {
  TopTracks as TopTracksType,
  TopArtists as TopArtistsType,
  Track as TrackType,
} from '../../types/spotify'
import type { State as ReduxState } from '../../types/state'
import type { RecommendationsState } from '../../reducers/recommendations'

const STEPS = {
  SELECT_TRACKS: 0,
  SELECT_ARTISTS: 1,
  SELECT_GENRES: 2,
  CONFIRM_PLAYLIST: 3,
}

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
  isLoading: boolean,
  createPlaylist: (tracks: Array<TrackType>) => Promise<Object>,
  recommendations: RecommendationsState,
}

type State = {
  topTracks: TopTracksType,
  topArtists: TopArtistsType,
  genres: Array<string>,
  activeStep: number,
  warningMessage: ?string,
  anchorEl: ?HTMLButtonElement,
  excluded: Array<TrackType>,
  stepsDone: { [string]: boolean },
}

class Wizard extends React.Component<Props, State> {
  state = {
    topTracks: [],
    topArtists: [],
    genres: [],
    activeStep: STEPS.SELECT_TRACKS,
    warningMessage: null,
    anchorEl: null,
    excluded: [],
    stepsDone: { 0: true },
  }

  handleTopTracksChange = (topTracks: TopTracksType) => {
    this.setState({ topTracks })
  }

  handleTopArtistsChange = (topArtists: TopArtistsType) => {
    this.setState({ topArtists })
  }

  handleRecommendationsChange = (track: TrackType) => {
    const { excluded } = this.state
    if (excluded.includes(track)) {
      this.setState({ excluded: excluded.filter(item => item.id !== track.id) })
    } else {
      this.setState({ excluded: [...excluded, track] })
    }
  }

  handlePrevious = () => {
    const { activeStep } = this.state
    this.setState({ activeStep: activeStep > 0 ? activeStep - 1 : activeStep })
  }

  handleNext = (event: Event) => {
    const {
      activeStep,
      anchorEl,
      excluded,
      stepsDone,
    } = this.state
    const { recommendations } = this.props
    if (!anchorEl) {
      // $FlowFixMe Flow doesn't understand event.target returns a button html element
      this.setState({ anchorEl: event.target })
    }
    if (this.isValid(activeStep + 1)) {
      stepsDone[activeStep + 1] = true
      this.setState({ activeStep: activeStep <= 3 ? activeStep + 1 : activeStep, stepsDone })
      if (activeStep === STEPS.CONFIRM_PLAYLIST) {
        this.props.createPlaylist(recommendations.data.filter(item => !excluded.includes(item)))
      }
    }
  }

  isValid(activeStep: number): boolean {
    const {
      topTracks,
      topArtists,
      genres,
    } = this.state
    if (activeStep === STEPS.CONFIRM_PLAYLIST &&
      topTracks.length === 0 &&
      topArtists.length === 0 &&
      genres.length === 0
    ) {
      this.setState({ warningMessage: 'Select at least one track, artist or genre' })
      return false
    }
    return true
  }

  goToStep(activeStep: number) {
    if (this.isValid(activeStep)) {
      this.setState({ activeStep })
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
      if (genres.length < 5) {
        this.setState({ genres: [...genres, genre] })
      }
    } else {
      const filtered = genres.filter(item => item !== genre)
      this.setState({ genres: filtered })
    }
  }

  openPlaylist = () => {
    const { recommendations } = this.props
    if (recommendations.playlist) {
      window.open(recommendations.playlist.external_urls.spotify)
    }
  }

  renderGenresList() {
    const { topArtists, genres } = this.state
    const list = new Set()
    topArtists.forEach(artist => artist.genres.forEach(genre => list.add(genre)))

    if (list.size === 0) {
      return (
        <div>No genres to suggest, try to select more artists</div>
      )
    }
    return (
      <React.Fragment>
        <Typography variant="subheading">Select up to 5 genres</Typography>
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
      </React.Fragment>
    )
  }

  render() {
    const { classes, isLoading, recommendations } = this.props
    const {
      activeStep,
      warningMessage,
      anchorEl, topTracks,
      topArtists,
      genres,
      excluded,
      stepsDone,
    } = this.state
    const steps = ['Select Tracks', 'Select Artists', 'Select Genres', 'Confirm your playlist']

    return (
      <div className={classes.container}>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                {(index < activeStep || stepsDone[index]) && (
                  <Button onClick={() => this.goToStep(index)}>
                    {label}
                  </Button>
                )}
                {index >= activeStep && !stepsDone[index] && label}
              </StepLabel>
              <StepContent>
                {activeStep === 0 && (
                  <TopTracks
                    title="Choose up to 5 songs to create your great playlist"
                    onChange={this.handleTopTracksChange}
                    initial={topTracks}
                    limit={5}
                  />
                )}
                {activeStep === 1 && (
                  <TopArtists
                    title="Choose up to 5 artists"
                    onChange={this.handleTopArtistsChange}
                    initial={topArtists}
                    limit={5}
                  />
                )}
                {activeStep === 2 && this.renderGenresList()}
                {activeStep === 3 && (
                  <Recommendations
                    title="Choose the musics for your playlist"
                    onChange={this.handleRecommendationsChange}
                    artists={topArtists}
                    tracks={topTracks}
                    genres={genres}
                    excluded={excluded}
                  />
                )}
                {!isLoading && activeStep > 0 && (
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
                {!isLoading && (
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === 3 ? 'Create Playlist' : 'Next Step'}
                    <Icon>{activeStep === 3 ? 'check' : 'keyboard_arrow_right'}</Icon>
                  </Button>
                )}
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
        {activeStep === 4 && !recommendations.playlist && <CircularProgress />}
        {activeStep === 4 && recommendations.playlist && (
          <Button
            variant="raised"
            color="primary"
            onClick={this.openPlaylist}
            className={classes.button}
          >
            <Icon>library_music</Icon>
            Open Playlist
          </Button>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  isLoading: state.topArtists.isFetching || state.topTracks.isFetching,
  recommendations: state.recommendations,
})

export default withStyles(styles)(connect(mapStateToProps, { createPlaylist })(Wizard))
