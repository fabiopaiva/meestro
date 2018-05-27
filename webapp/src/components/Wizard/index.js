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
  Recommendations as RecommendationsType,
  Track as TrackType,
} from '../../types/spotify'
import type { State as ReduxState } from '../../types/state'

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
  createPlaylist: (tracks: Array<TrackType>) => Promise<Object>
}

type State = {
  topTracks: TopTracksType,
  topArtists: TopArtistsType,
  genres: Array<string>,
  recommendations: RecommendationsType,
  activeStep: number,
  warningMessage: ?string,
  anchorEl: ?HTMLButtonElement,
  playlistUrl: ?string,
}

class Wizard extends React.Component<Props, State> {
  state = {
    topTracks: [],
    topArtists: [],
    genres: [],
    recommendations: [],
    activeStep: 0,
    warningMessage: null,
    anchorEl: null,
    playlistUrl: null,
  }

  handleTopTracksChange = (topTracks: TopTracksType) => {
    this.setState({ topTracks })
  }

  handleTopArtistsChange = (topArtists: TopArtistsType) => {
    this.setState({ topArtists })
  }

  handleRecommendationsChange = (recommendations: RecommendationsType) => {
    this.setState({ recommendations })
  }

  handlePrevious = () => {
    const { activeStep } = this.state
    this.setState({ activeStep: activeStep > 0 ? activeStep - 1 : activeStep })
  }

  handleNext = (event: Event) => {
    const {
      activeStep,
      topTracks,
      anchorEl,
      recommendations,
    } = this.state
    if (!anchorEl) {
      // $FlowFixMe Flow doesn't understand event.target returns a button html element
      this.setState({ anchorEl: event.target })
    }
    if (topTracks.length === 0) {
      this.setState({ warningMessage: 'Select at least one track' })
    } else {
      this.setState({ activeStep: activeStep <= 3 ? activeStep + 1 : activeStep })
      if (activeStep === 3) {
        this.props.createPlaylist(recommendations).then((response) => {
          console.log(response)
          if (response.type === 'PLAYLIST_CREATE_SUCCESS') {
            this.setState({ playlistUrl: response.data.external_urls.spotify })
          }
        })
      }
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
        genres.push(genre)
        this.setState({ genres })
      }
    } else {
      const filtered = genres.filter(item => item !== genre)
      this.setState({ genres: filtered })
    }
  }

  openPlaylist = () => {
    window.open(this.state.playlistUrl)
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
    const { classes, isLoading } = this.props
    const {
      activeStep,
      warningMessage,
      anchorEl, topTracks,
      topArtists,
      genres,
      playlistUrl,
    } = this.state
    const steps = ['Select Tracks', 'Select Artists', 'Select Genres', 'Confirm your playlist']
    return (
      <div className={classes.container}>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
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
                    onLoad={this.handleRecommendationsChange}
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
        {activeStep === 4 && !playlistUrl && <CircularProgress />}
        {activeStep === 4 && playlistUrl && (
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
})

export default withStyles(styles)(connect(mapStateToProps, { createPlaylist })(Wizard))
