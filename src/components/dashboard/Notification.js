import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import NotificationList from './NotificationList'
import { Link } from 'react-router-dom'

const Notification = ({ notifications }) => {
  return(
    <div className="notification-card card z-depth-0 show-up">
      <span className="go-home">
        <Link to='/'>
          <i className="material-icons"> home </i>
        </Link>
      </span>
      <div className="card-content">
        <span className="card-title">Notifications</span>
          <ul className="notifications">
            <NotificationList notifications={notifications} />
          </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  firestoreConnect([
    { collection: 'notifications',
        orderBy: ['time', 'desc']
      }
  ]),
  connect(mapStateToProps)
)(Notification)
