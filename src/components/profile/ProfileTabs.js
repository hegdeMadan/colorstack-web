import React from 'react'

const ProfileTabs = ({ item, onClick }) => {

  function handleClick() {
    onClick(item)
  }
  return(
    <div>
      <li className="list tab" onClick={handleClick} >
        {item}
      </li>
    </div>
  )
}

export default ProfileTabs
