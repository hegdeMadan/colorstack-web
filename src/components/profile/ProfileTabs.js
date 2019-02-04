import React, { Component } from 'react'

class ProfileTabs extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  handleClick = (e) => {
    console.log(e.target.li)
  }

  render() {
    return(
      <div>
        <div className="profile-tabs">
          <ul>
            <li onClick={this.handleClick}>
              Bio
            </li>
            <li onClick={this.handleClick}>
              Followers
            </li>
            <li onClick={this.handleClick}>
              Art Works
            </li>
            <li className="waves-effect" onClick={this.handleClick}>
              Collections
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ProfileTabs
