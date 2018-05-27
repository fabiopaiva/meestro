// @flow
import React from 'react'
import { connect } from 'react-redux'
import UserCard from '../../components/UserCard'
import Wizard from '../../components/Wizard'
import type { State } from '../../types/state'
import type { UserState } from '../../reducers/user'

type Props = {
  user: UserState
}

const Home = ({ user }: Props) => (
  <div className="Home">
    {user.isLogged && (
      <React.Fragment>
        <UserCard user={user.data} className="userCard" />
        <Wizard />
      </React.Fragment>
  )}
  </div>
)
const mapStateToProps = (state: State) => ({
  user: state.user,
})
export default connect(mapStateToProps)(Home)
