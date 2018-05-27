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
  onChange: (TrackType) => void,
  excluded: Array<TrackType>,
}

type State = {}

class Recommendations extends React.Component<Props, State> {
  static defaultProps = {
    title: 'Recommendations',
    excluded: [],
  }

  componentDidMount() {
    const {
      artists,
      tracks,
      genres,
      recommendations,
    } = this.props
    if (!recommendations.isFetching) {
      this.props.fetchRecommendations({ artists, tracks, genres })
    }
  }

  componentWillReceiveProps(props){ console.log(props) }

  render() {
    const {
      recommendations: { isFetching, error, data },
      title,
      onChange,
      excluded,
    } = this.props

    console.log(excluded)

    if (isFetching) return <CircularProgress />
    if (error) return <p>Something went wrong: {error.message}</p>

    return (
      <React.Fragment>
        <Typography variant="subheading">{title}</Typography>
        <List>
          {data.map(track => (
            <Track
              key={track.id}
              checked={!excluded.some(item => track.id === item.id)}
              onClick={() => onChange(track)}
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
