import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOutAction } from '../../store/actions/AuthActions'

const SignedInLinks = (props) => {
  const { initials } = props
  return(
    <div>
      <ul className="right nav-links">
        <li> <NavLink to='/createproject' className="black-text">New Project</NavLink></li>
        <li> <NavLink to='/' className="btn btn-floating grey lighten-4 z-depth-0 black-text"> {initials} </NavLink></li>
        <li> <NavLink to='/' className="black-text" onClick={props.signOut}> Log Out </NavLink> </li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    initials: state.firebase.profile.initials
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
