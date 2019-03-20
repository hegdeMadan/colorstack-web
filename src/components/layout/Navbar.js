import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, notifications } = props // destructuring auth from the store
  const displaySignInOrSignOut = auth.uid ? <SignedInLinks notifications={notifications}/> : <SignedOutLinks />
  return(
    <div className="navbar-fixed">
      <nav className="nav-wrapper z-depth-0">
        <div className="container">
          <Link to='/'
            className="brand-logo hide-on-sm-only black-text">
              logo
            </Link>
          { displaySignInOrSignOut }
        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("nav" ,state)
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default connect(mapStateToProps)(Navbar)
