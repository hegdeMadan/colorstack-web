import React, { Component } from 'react'
import portrait from '../../static/portrait.png'
// import coffee from '../../static/coffee.jpg'
import ProfileTabs from './ProfileTabs'
import UploadImage from './functions/UploadImage'
import Follow from './functions/Follow'

class ProfilePicture extends Component {
  constructor() {
    super()
    this.state = {
      style: {
        display: "none"
      }
    }
  }

  getTab = (item) => {
    this.props.onClick(item)
  }

  handleClick = () => {
    this.setState(() => {
      return{
        style: {
          display: "block"
        }
      }
    })
  }

  closeModal = () => {
    this.setState(() => {
      return{
        style: {
          display: "none"
        }
      }
    })
  }

  render() {
    const { profile } = this.props // profile of the url param id
    const { urlId } = this.props // url param id
    const { uid } = this.props // id of the user who is logged in
    // console.log(urlId)
    return(
      <div>
        <div className="profile-picture">

           <div style={this.state.style}>
              <UploadImage onClick={this.closeModal} uid={this.props.uid}/>
            </div>

          {/*<div className="cover">
            <img src={coffee} alt="cover" height="300px" width="100%" />
            <i className="material-icons">add_a_photo</i>
            <div className="follow">
              { urlId !== uid
                ? <Follow profile={profile} />
                : null }
            </div>
          </div>*/}

          <div className="container">
            <div className="row">

              <div className="col l4 pull-l1 m4 pull-m1 s8 push-s2 center profile-about-cover">

                <div className="image">
                  <div>
                  {
                    profile && profile.pictureUrl && profile.id === urlId
                    ? <img src={profile.pictureUrl} alt="profile" className="z-depth-4" />
                    : <img src={portrait} alt="profile" />
                  }
                  </div>

                  { urlId === uid
                    ? <i className="material-icons"
                        onClick={this.handleClick}>
                        add_a_photo
                      </i>
                    : null }

                </div>

              </div>

              <div className="col l8 m8 s12">
                <div>
                  <ProfileTabs onClick={this.getTab} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ProfilePicture
