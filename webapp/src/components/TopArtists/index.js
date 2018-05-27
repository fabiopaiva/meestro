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
import { fetchTopArtists } from '../../actions/spotify'
import type { State as ReduxState } from '../../types/state'
import type { TopArtistsState } from '../../reducers/topArtists'
import type { Artist } from '../../types/spotify'

type Props = {
  title?: string,
  fetchTopArtists: () => void,
  topArtists: TopArtistsState,
  onChange: (Array<Artist>) => void,
  initial?: Array<Artist>,
  limit?: number,
}
type State = {
  artists: Array<Artist>
}

class TopArtists extends React.Component<Props, State> {
  static defaultProps = {
    title: 'Top Artists',
    onChange: () => {},
    initial: [],
    limit: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      artists: props.initial,
    }
  }

  componentDidMount() {
    const { topArtists } = this.props
    if (!topArtists.isLoaded) {
      this.props.fetchTopArtists()
    }
  }

  handleToggle = (artist: Artist) => {
    const { onChange, limit } = this.props
    const { artists } = this.state
    if (!artists.includes(artist)) {
      if (!limit || artists.length < limit) {
        artists.push(artist)
        onChange(artists)
        this.setState({ artists })
      }
    } else {
      const filtered = artists.filter(t => t.id !== artist.id)
      onChange(filtered)
      this.setState({ artists: filtered })
    }
  }

  renderArtist = (artist: Artist) => {
    const { images } = artist
    const { artists } = this.state

    const img = images && images.reduce((acc, item) => (item.width < acc.width ? item : acc))

    return (
      <ListItem key={artist.id} dense button onClick={() => this.handleToggle(artist)}>
        {img && <Avatar alt={artist.name} src={img.url} />}
        <ListItemText primary={artist.name} />
        <ListItemSecondaryAction>
          <Checkbox
            onChange={() => this.handleToggle(artist)}
            checked={artists.some(item => artist.id === item.id)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  render() {
    const { title, topArtists: { data, isFetching, error } } = this.props
    if (isFetching) return <CircularProgress />
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
      <React.Fragment>
        <Typography variant="subheading">{title}</Typography>
        <List>
          {data.map(this.renderArtist)}
        </List>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  topArtists: state.topArtists,
})

export default connect(mapStateToProps, { fetchTopArtists })(TopArtists)
