import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

const Users = ({users, store}) => {
  console.log("usrs: ", users)
  return(
    <div className="mobile_user_wrapper">
        <div className="mobile_user">
            <div className="user_list_wrapper card z-depth-0">
                <div className="people">
                    <span> People </span>
                    <span> 
                      <Link to='/'>
                        <i className="material-icons"> home </i>
                      </Link>
                    </span>
                </div>
                <ul>
                    { users && users.map(user => {
                    // const userImage = user.pictureUrl ? user.pictureUrl : avatar
                    return (
                        <Link
                        key={user.id}
                        to={'profile/' + user.uid}
                        className="black-text">
                        <div className="user_ind">
                            <li>
                            <span className="userimage">
                                {user.pictureUrl || user.imageUrl || user.avatarUrl
                                ? <img
                                    src={user.pictureUrl || user.imageUrl || user.avatarUrl}
                                    className="circle_img"
                                    alt="dp"
                                    height="40px"
                                    width="40px" />
                                : <span className="avatar">
                                    <i className="material-icons">person</i>
                                    </span>}
                            </span>
                            <div className="names">
                                <span className="username">
                                {`${user.firstName} ${user.lastName}` || user.fullname}
                                </span>
                                <span className="uname">
                                @{user.username}
                                </span>
                            </div>
                            </li>
                        </div>
                        </Link>
                    )
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users
  }
}

export default compose(
  firestoreConnect([
    {collection:'users'}
  ]),
  connect(mapStateToProps)
)(Users)
