import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import portrait from '../../static/portrait.png'
import UserDetails from './UserDetails'
import ProfileDetails from './ProfileDetails'
import Bio from './Bio'
import YourArts from './YourArts'
import Followers from './Followers'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      canEdit: false
    }
  }

  handleSelect = (item) => {
    this.setState(() => {
      return {
        item
      }
    })
  }

  render() {
    const { auth } = this.props
    const { profile } = this.props
    const { item } = this.state
    if(!auth.uid) return <Redirect to="/signin" />
    let tab
    if(item === "Bio") {
      tab = <Bio />
    } else {
      if(item === "Your Arts") {
        tab = <YourArts />
      } else {
        if(item === "Followers") {
          tab = <Followers />
        } else {
          tab = <ProfileDetails />
        }
      }
    }


    return(
      <div className="container white profile">
        <div className="row">

          <div className="profile-image-container col l12 m12 s12">
            <div className="profile-image">
              <img src={portrait} alt="portrait" className="circle responsive-img" height="200" width="200" />
              <span className="user-name"> {`${profile.firstName} ${profile.lastName}`}  </span>
            </div>
          </div>
          <div className="col l4 m4 s12 user-details">
            <UserDetails onSelect={this.handleSelect} />
          </div>

          <div className="col l8 m8 s12 user-details-content">
            {tab}
            <span className="edit right">
              <Link to="/editprofile">
                edit profile
                <i className="material-icons edit-icon">edit</i>
              </Link>
            </span>
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
