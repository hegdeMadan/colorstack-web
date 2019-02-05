import React from 'react'
import portrait from '../../static/portrait.png'
import coffee from '../../static/coffee.jpg'
import ProfileTabs from './ProfileTabs'

const ProfilePicture = (props) => {

  function getTab(item) {
    props.onClick(item)
  }

  return(
    <div>
      <div className="profile-picture">

        <div className="cover">
          <img src={coffee} alt="cover" height="300px" width="100%" />
        </div>

        <div className="container">
          <div className="row">

            <div className="col l4 pull-l1 m4 pull-m1 s8 push-s2 center profile-about-cover">

              <div className="image">
                <img src={portrait} alt="profile" />
              </div>

            </div>
            <div className="col l8 m8 s12">
              <div>
                <ProfileTabs onClick={getTab} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePicture
