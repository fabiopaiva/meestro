// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { UserState } from '../../reducers/user'
import { Auth } from '../'
import logo from '../../assets/images/logo.png'

type Props = {
  children: React.Node,
  user: UserState
}

const Layout = ({ children, user }: Props) => (
  <div>
    <img src={logo} alt="logo" />
    {!user.isLogged ? <Auth /> : children}
  </div>
)

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Layout)
