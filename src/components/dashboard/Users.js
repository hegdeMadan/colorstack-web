import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({users}) => {
  return(
    <div className="user_list_wrapper card z-depth-0">
      <div className="people">
        <span> People </span>
      </div>
      <ul>
        { users && users.map(user => {
          // const userImage = user.pictureUrl ? user.pictureUrl : avatar
          return (
            <Link
              key={user.id}
              to={'profile/' + user.id}
              className="black-text">
              <div className="user_ind">
                <li>
                  <span className="userimage">
                    {user.pictureUrl
                      ? <img
                        src={user.pictureUrl}
                        className="circle_img"
                        alt="dp"
                        height="40px"
                        width="40px" />
                      : <span className="avatar">
                          <i className="material-icons">person</i>
                        </span>}
                  </span>
                  <span className="username">
                    {user.firstName + user.lastName}
                  </span>
                </li>
              </div>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default Users
