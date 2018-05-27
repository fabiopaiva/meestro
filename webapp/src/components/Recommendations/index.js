// @flow
import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Track from '../Track'
import { fetchRecommendations } from '../../actions/spotify'
import type { Track as TrackType, Artist as ArtistType } from '../../types/spotify'
import type { State as ReduxState } from '../../types/state'
import type { Params as RecommendationsParams, RecommendationsState } from '../../reducers/recommendations'

type Props = {
  artists: Array<ArtistType>,
  tracks: Array<TrackType>,
  genres: Array<string>,
  fetchRecommendations: (params: RecommendationsParams) => Promise<Object>,
  recommendations: RecommendationsState,
  title?: string,
  onChange: (Array<TrackType>) => void,
  onLoad?: (Array<TrackType>) => void,
}

type State = {
  selected: Array<TrackType>,
}

class Recommendations extends React.Component<Props, State> {
  static defaultProps = {
    title: 'Recommendations',
    onLoad: () => {},
  }

  state = {
    selected: [],
  }

  componentDidMount() {
    const {
      artists,
      tracks,
      genres,
      onLoad,
      recommendations,
    } = this.props
    if (!recommendations.isFetching) {
      this.props.fetchRecommendations({ artists, tracks, genres }).then((response) => {
        if (response && response.type === 'RECOMMENDATIONS_SUCCESS' && response.data) {
          this.setState({
            selected: response.data,
          })
          if (onLoad) onLoad(response.data)
        }
      })
    }
  }

  handleToggle = (track: TrackType) => {
    const { onChange } = this.props
    const { selected } = this.state
    if (!selected.includes(track)) {
      selected.push(track)
      onChange(selected)
      this.setState({ selected })
    } else {
      const filtered = selected.filter(t => t.id !== track.id)
      onChange(filtered)
      this.setState({ selected: filtered })
    }
  }

  render() {
    const { recommendations: { isFetching, error, data }, title } = this.props
    const { selected } = this.state

    if (isFetching) return <CircularProgress />
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
      <React.Fragment>
        <Typography variant="subheading">{title}</Typography>
        <List>
          {data.map(track => (
            <Track
              key={track.id}
              checked={selected.some(item => track.id === item.id)}
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
  recommendations: state.recommendations,
})

export default connect(mapStateToProps, { fetchRecommendations })(Recommendations)
