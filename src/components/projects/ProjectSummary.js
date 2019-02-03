import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
// import firebase from 'firebase'
import AddComment from './projectActs/AddComment'
import PostCredits from './projectActs/PostCredits'
import Comments from './projectActs/Comments'

class ProjectSummary extends Component{

  // handleClick = () => {
  //
  // }
  render() {
    const { project } = this.props
    const likeCount = project.likeCount ? project.likeCount : 0
    console.log(this.props.comments)
  return(
    <div className="card z-depth-0 project-summary show-up post">
      <div className="name">
        <span className="btn btn-floating z-depth-0 black user-indicator">
          {project.authorFirstName && project.authorFirstName[0]}
          {project.authorSecondName && project.authorSecondName[0]}
        </span>
         <span> {project.authorFirstName} {project.authorSecondName} </span>
         <span className="right options">
          <i className="material-icons">more_vert</i>
        </span>
      </div>
      <div className="title">
        <Link to={'/projectdetails/' + project.id} className="black-text">
          <p className="post-title"> {project.title} </p>
        </Link>
      </div>
      <div className="card-image">
        <img src={project.imageUrl} alt="art"/>
        <p className="grey-text date-format">
          {project.createdAt && project.createdAt
            .toDate()
            .toLocaleDateString('indian', {
              year: "numeric", month: "short", day: "numeric"
          })}
        </p>
        <PostCredits projectId={project.id} likeCount={likeCount} />
      </div>

      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          comments
          <i className="material-icons right">close</i>
        </span>
        <Comments projectId={project.id} comments={this.props.comments}/>
        <div className="add-comment valign-wrapper">
          <AddComment projectId={project.id} />
        </div>
      </div>

      <div className="card-content">
        <p> {project.content} </p>
          <p className="grey-text lighten-3 load-comments activator">
            Load comments
          </p>
      </div>

      <div className="add-comment">
        <AddComment projectId={project.id} />
      </div>
    </div>
  )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.project.id
  const comments = state.firestore.ordered[id]
  return {
    comments: comments
  }
}

export default compose (
  firestoreConnect(props => {
    return [
      {
        collection: 'projects',
        doc: props.project.id,
        subcollections: [
          {
            collection: 'comments',
          }
        ],
        storeAs: props.project.id,
        orderBy: ['commentTime', 'desc']
      }
    ]
  }),
  connect(mapStateToProps)
)(ProjectSummary)

// export default ProjectSummary
