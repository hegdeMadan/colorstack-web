import React from "react"
import portrait from '../../../static/portrait.png'

const Picture = ({profile, onClick, paramId, auth}) => {

  const handleClick = () => {
    onClick()
  }

  return (
    <div>
      { paramId === auth.uid
        ? <div className="edit_pro_wrap">
            <span onClick={handleClick}>
              {/*<i className="material-icons"> edit </i>*/}
              edit profile
            </span>
          </div>
        : null }
      <div className="picture">
        { profile && (profile.pictureUrl || profile.imageUrl || profile.avatarUrl)
          ? <img className="z-depth-1" src={profile.pictureUrl || profile.imageUrl || profile.avatarUrl } alt="dp" />
          : <img className="z-depth-1" src={portrait} alt="dp" /> }

          <div className="user_basic">
            <div>
              <span className="full_name">
                { profile.fullName || profile.userName || profile.displayName }
              </span>
              <span className="uname"> @{profile && profile.username } </span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Picture
