import React from 'react'

const UserDetails = () => {
  return(
    <div className="user_det-wrap">
      <div className="card z-depth-0 white user_det">
        <ul>
          <li>
            <span>Current Location</span>
            <span>Mysore</span>
          </li>
          <li>
            <span> Hometown </span>
            <span>Mysore</span>
          </li>
          <li>
            <span>Facebook</span>
            <span>Mysore</span>
          </li>
          <li>
            <span>Instagram</span>
            <span>Mysore</span>
          </li>
          <li>
            <span> website </span>
            <span>Mysore</span>
          </li>
          <span>
            <i className="material-icons tiny">edit</i>
          </span>
        </ul>
      </div>
    </div>
  )
}

export default UserDetails
