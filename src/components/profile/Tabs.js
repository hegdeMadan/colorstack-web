import React from 'react'

const Tabs = ({item, onClick}) => {

  function handleClick() {
    onClick(item)
  }

  return(
    <div>
      <div className="profile-tabs">
        <ul>
          <li onClick={handleClick}>
            {item}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Tabs
