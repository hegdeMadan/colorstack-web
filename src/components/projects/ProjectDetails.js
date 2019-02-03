import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const ProjectDetails = (props) => {
  const { project } = props
  if (project) {
    return (
      <div className="container section project-details">
        <div className="row">
          <div className="col s12 m8 l8 offset-l2">
            <div className="card z-depth-0 show-up">
              <div className="card-content">
                <span className="card-title"> {project.title} </span>
                <p>{project.content}</p>
              </div>
              <div className="card-action grey-text">
                <div>Posted by {project.authorFirstName} {project.authorSecondName} </div>
                <div>{project.createdAt.toDate().toLocaleDateString('indian', {year: "2-digit", month: "short", day: "numeric"})}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p> Loading projects. . . .  </p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id
  const projects = state.firestore.data.projects
  const project = projects ? projects[id] : null
  return {
    project: project
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
   { collection: 'projects' }
  ])
)(ProjectDetails)

// export default connect(mapStateToProps)(ProjectDetails)
