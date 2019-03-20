import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FollowUser } from '../../../store/actions/FollowUser'

class Follow extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleClick = () => {
    // console.log("id", this.props.urlId)
    const { profile } = this.props
    this.setState(() => {
      return{
        name: `${profile.firstName} ${profile.lastName}`,
        userid: profile.id
      }
    }, () => {
      console.log(this.state)
      this.props.FollowUser(this.state)
    })
  }

  render(){
    return(
      <div>
        <button
          className="btn z-depth-0 grey lighten-2 black-text"
          onClick={this.handleClick}>
          Follow
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    FollowUser: (followingDetails) => dispatch(FollowUser(followingDetails))
  }
}

export default connect(null, mapDispatchToProps)(Follow)
