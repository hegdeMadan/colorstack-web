import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import DropDown from './dropDown'
import user from '../../static/icons/user.png'
import { signOutAction } from '../../store/actions/AuthActions'
// import Notification from '../dashboard/Notification'

const SignedInLinks = (props) => {

  const { profile } = props
  const userImage = profile && profile.pictureUrl ? profile.pictureUrl : user
  const id = props.auth.uid
  // const { notifications } = props

  return(
    <div className="nav_logo_cont_wrap">
      <ul className="right nav-links">
        <li className="drop_down-btn">
          <NavLink to={'/profile/'+ id}>
            <img
              src={userImage}
              className="btn btn-floating transparent z-depth-0"
              alt="dp"
              height="40px"
              width="40px" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            className="black-text"
            onClick={props.signOut}>
              logout
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction())
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
