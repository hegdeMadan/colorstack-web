import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Redirect, Link } from 'react-router-dom'
import ProfilePicture from './ProfilePicture'
import Bio from './TabContents/Bio'
import Followers from './TabContents/Followers'
import ArtWork from './TabContents/ArtWorks'
import Collections from './TabContents/Collections'

class Profile extends Component {
  constructor() {
    super()
    this.state = { }
  }

  handleClick = (item) => {
    this.setState(() => {
      return {
        item
      }
    }, () => {
      console.log("state" ,this.state)
    })
  }

  render() {
    const { auth } = this.props
    const { profile } = this.props
    var tabItem = this.state.item
    var tab
    
    if(tabItem === Followers) {
      tab = <Followers />
    } else if(tabItem === Bio) {
        tab = <Bio />
    } else if(tabItem === Collections) {
      tab = <Collections />
    } else {
      tab = <ArtWork />
    }
    return(
      <div className="profile-wrapper">
        <div className="row">

          <div className="col l12 m12 s12">

            <div>
              <ProfilePicture onClick={this.handleClick} />
            </div>

          </div>

          <div className="container tab-content-wrapper">
            <div className="col l4 m4 s12">
              <span className="">
                <i className="material-icons">note_add</i>
              </span>
              <span className="">
                <i className="material-icons">person_add</i>
              </span>
            </div>
            <div className="col l8 m8 s12">
              {tab}
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
