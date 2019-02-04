import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Redirect, Link } from 'react-router-dom'
import ProfilePicture from './ProfilePicture'

class Profile extends Component {
  render() {
    const { auth } = this.props
    const { profile } = this.props

    return(
      <div className="profile-wrapper">
        <div className="row">
          <div className="col l12 m12 s12">

            <div>
              <ProfilePicture />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("state: ", state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Profile)
