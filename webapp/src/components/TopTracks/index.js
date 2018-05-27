// @flow

import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import { fetchTopTracks } from '../../actions/spotify'
import Track from '../Track'
import type { State as ReduxState } from '../../types/state'
import type { TopTracksState } from '../../reducers/topTracks'
import type { Track as TrackType } from '../../types/spotify'

type Props = {
  title?: string,
  fetchTopTracks: () => void,
  topTracks: TopTracksState,
  onChange: (Array<TrackType>) => void,
  initial?: Array<TrackType>,
  limit?: number,
}
type State = {
  tracks: Array<TrackType>
}

class TopTracks extends React.Component<Props, State> {
  static defaultProps = {
    title: 'Top Tracks',
    onChange: () => {},
    initial: [],
    limit: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      tracks: props.initial,
    }
  }

  componentDidMount() {
    const { topTracks } = this.props
    if (!topTracks.isLoaded) {
      this.props.fetchTopTracks()
    }
  }

  handleToggle = (track: TrackType) => {
    const { onChange, limit } = this.props
    const { tracks } = this.state
    if (!tracks.includes(track)) {
      if (!limit || tracks.length < limit) {
        tracks.push(track)
        onChange(tracks)
        this.setState({ tracks })
      }
    } else {
      const filtered = tracks.filter(t => t.id !== track.id)
      onChange(filtered)
      this.setState({ tracks: filtered })
    }
  }

  render() {
    const { title, topTracks: { data, isFetching, error } } = this.props
    const { tracks } = this.state
    if (isFetching) return <CircularProgress />
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
      <React.Fragment>
        <Typography variant="subheading">{title}</Typography>
        <List>
          {data.map(track => (
            <Track
              key={track.id}
              checked={tracks.some(item => track.id === item.id)}
              onClick={() => this.handleToggle(track)}
              track={track}
            />
          ))}
        </List>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  topTracks: state.topTracks,
})

export default connect(mapStateToProps, { fetchTopTracks })(TopTracks)
