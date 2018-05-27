// @flow
import React from 'react'
import { connect } from 'react-redux'
import type { State } from '../../types/state'
import type { UserState } from '../../reducers/user'

type Props = {
  user: UserState
}

const Home = ({ user }: Props) => (
  <div>
    <h1>Welcome {user.data && user.data.name}</h1>
  </div>
)
const mapStateToProps = (state: State) => ({
  user: state.user,
})
export default connect(mapStateToProps)(Home)
