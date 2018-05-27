// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import type { UserModel } from '../../types/user'

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
})

type Props = {
  user: UserModel,
  classes: Object,
  className?: string,
}

const UserCard = ({ user, classes, className }: Props) => (
  <Card className={[classes.card, className].join(' ')}>
    <CardMedia
      className={classes.cover}
      image={user.image}
    />
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Typography variant="headline">Welcome</Typography>
        <Typography variant="subheading" color="textSecondary">
          {user.name}
        </Typography>
      </CardContent>
    </div>
  </Card>
)

UserCard.defaultProps = {
  className: '',
}


export default withStyles(styles)(UserCard)
