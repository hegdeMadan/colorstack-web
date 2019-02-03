import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import Notification from './Notification'

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props
    if (!auth.uid) return <Redirect to='/signin' /> // redirecting signed out users to signin/signup page
    return(
      <div className="dashboard container">
        <div className="row">
          <div className="col l8 m12 s12">
            <ProjectList projects={projects} />
          </div>
          <div className="col l4 hide-on-med-and-down">
            <Notification notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("ref: ", state)
  return {
    projects: state.firestore.ordered.projects,
    initials: state.firebase.profile.initials,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose (
  firestoreConnect([
    { collection: 'projects',
    orderBy: ['createdAt', 'desc']
    },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ]),
  connect(mapStateToProps)
)(Dashboard)
