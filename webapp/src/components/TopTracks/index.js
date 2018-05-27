// @flow

import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import { fetchTopTracks } from '../../actions/spotify'
import type { State as ReduxState } from '../../types/state'
import type { TopTracksState } from '../../reducers/topTracks'
import type { TopTrack } from '../../types/spotify'

type Props = {
  title?: string,
  fetchTopTracks: () => void,
  topTracks: TopTracksState,
  onChange: (Array<TopTrack>) => void,
  initial?: Array<TopTrack>,
}
type State = {
  tracks: Array<TopTrack>
}

class TopTracks extends React.Component<Props, State> {
  static defaultProps = {
    title: 'Top Tracks',
    onChange: () => {},
    initial: [],
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

  handleToggle = (track: TopTrack) => {
    const { onChange } = this.props
    const { tracks } = this.state
    if (!tracks.includes(track)) {
      tracks.push(track)
      onChange(tracks)
      this.setState({ tracks })
    } else {
      const filtered = tracks.filter(t => t.id !== track.id)
      onChange(filtered)
      this.setState({ tracks: filtered })
    }
  }

  renderTrack = (track: TopTrack) => {
    const { album: { images, name: albumName }, artists } = track
    const { tracks } = this.state

    const img = images && images.reduce((acc, item) => (item.width < acc.width ? item : acc))
    const artistsNames = artists.reduce((acc, item) => (acc.concat(item.name)), [])

    return (
      <ListItem key={track.id} dense button onClick={() => this.handleToggle(track)}>
        {img && <Avatar alt="Remy Sharp" src={img.url} />}
        <ListItemText primary={track.name} secondary={`${albumName} - ${artistsNames.join(' / ')}`} />
        <ListItemSecondaryAction>
          <Checkbox
            onChange={() => this.handleToggle(track)}
            checked={tracks.some(item => track.id === item.id)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  render() {
    const { title, topTracks: { data, isFetching, error } } = this.props
    if (isFetching) return <CircularProgress />
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
      <React.Fragment>
        <Typography variant="subheading">{title}</Typography>
        <List>
          {data.map(this.renderTrack)}
        </List>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  topTracks: state.topTracks,
})

export default connect(mapStateToProps, { fetchTopTracks })(TopTracks)
