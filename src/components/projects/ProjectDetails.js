import React, { Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import Comments from './projectActs/Comments'

class ProjectDetails extends Component {
  render() {
  const { project } = this.props
  // console.log("prop", project && project)
  const { comments } = this.props
  if (project) {
    return(
      <div>
        {
          project && project.map((project) => {
            return (
              <div className="container section project-details"
                key={project.id}>

                <div className="row">

                  <div className="col s12 m8 offset-l2 l8 offset-l2">
                    <div className="card z-depth-0 show-up">
                      <div className="card-content">
                        <span className="card-title"> {project && project.title} </span>
                        <div className="card-image">
                          <img src={project && project.imageUrl} alt="project" />
                          <p>{project && project.content}</p>
                        </div>

                      </div>

                      <div className="card-action grey-text">

                        <div>
                        <Link to={'../profile/' + project.authorId} className="blue-text">
                          {project && project.authorFirstName} {project && project.authorSecondName}
                        </Link>

                        </div>
                        <div>{ project && project.createdAt &&
                            project.createdAt.toDate()
                            .toLocaleDateString('indian',
                            {year: "2-digit", month: "short", day: "numeric"})}
                        </div>
                        <div className="comment-details">
                          <Comments comments={comments} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
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
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  const id = ownProps.match.params.id
  const comments = state.firestore.ordered
  // console.log("projects: ", comments)
  const comment = comments ? comments[id] : null
  // console.log("project: ", comment)
  return {
    project: state.firestore.ordered.projects,
    comments: comment
  }
}

export default compose(
  firestoreConnect(props => {
    return [
     {
       collection: 'projects',
       doc: props.match.params.id
     },
     {
       collection: 'projects',
       doc: props.match.params.id,
       subcollections: [
         {
           collection: 'comments'
         }
       ],
       storeAs: props.match.params.id,
       orderBy: ['commentTime', 'desc']
     }
    ]
  }),
  connect(mapStateToProps)
)(ProjectDetails)

// export default connect(mapStateToProps)(ProjectDetails)
