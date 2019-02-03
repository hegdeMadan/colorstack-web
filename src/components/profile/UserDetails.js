import React, { Component } from 'react'
import ProfileTabs from './ProfileTabs'

class UserDetails extends Component {
  constructor() {
    super()
    this.state = {
      profile: ['Profile Details','Bio','Your Arts','Followers']
    }
  }

  handleClick = (item) => {
    this.props.onSelect(item)
    // console.log("item: ", item)
  }


  render() {
    var data = this.state.profile
    data = data.map((item, index) => {
      return(
        <ProfileTabs item={item} key={index} onClick={this.handleClick}/>
      )
    })
    return(
      <div>
        <ul className="">
          {data}
        </ul>
      </div>
    )
  }
}
export default UserDetails
