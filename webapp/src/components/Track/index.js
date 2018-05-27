// @flow
import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import type { Track as TrackType } from '../../types/spotify'

type Props = {
  track: TrackType,
  onClick: () => void,
  checked: boolean,
}
type State = {}

export default class Track extends React.PureComponent<Props, State> {
  render() {
    const {
      track: { name, album: { images, name: albumName }, artists },
      onClick,
      checked,
    } = this.props

    const img = images && images.reduce((acc, item) => (item.width < acc.width ? item : acc))
    const artistsNames = artists.reduce((acc, item) => (acc.concat(item.name)), [])

    return (
      <ListItem dense button onClick={onClick}>
        {img && <Avatar alt={name} src={img.url} />}
        <ListItemText primary={name} secondary={`${albumName} - ${artistsNames.join(' / ')}`} />
        <ListItemSecondaryAction>
          <Checkbox
            onChange={onClick}
            checked={checked}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}
