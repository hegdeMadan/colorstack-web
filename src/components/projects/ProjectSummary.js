import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import AddComment from './projectActs/AddComment'
import PostCredits from './projectActs/PostCredits'
import Comments from './projectActs/Comments'
// import FixedCategories from './Categories'

class ProjectSummary extends Component{
  constructor() {
    super()
    this.linkRef = React.createRef()
    this.state = {
      style: {
        display: 'none'
      }
    }
  }

  handleClick = () => {
    // const link = this.refs.link
    // console.log(link)
    // // link.focus()
    // link.select()
    // document.execCommand('copy')
    // // alert("link copied")
  }

  render() {
    // console.log(window.location.href)
    // const currentUrl = window.location.href
    const { project, auth, comments } = this.props ? this.props : null // changes done
    const likeCount = project.likeCount ? project.likeCount : 0
    const collected = project.collected ? project.collected : 0
    // console.log(this.props.comments)

  return(
    <div className="card z-depth-0 project-summary show-up post">

      <div className="name">
        <Link to={'/profile/' + project.authorId} className="black-text">
          <div className="btn z-depth-0 user-indicator">
            <span>
              {project.authorFirstName && project.authorFirstName[0]}
              {project.authorSecondName && project.authorSecondName[0]}
            </span>
          </div>
          <span className="user_name">
            {project.authorFirstName} {project.authorSecondName}
          </span>
        </Link>

          <span className="right options">
           <button className="btn z-depth-0 transparent"
            onClick={this.handleClick}>
             <i className="material-icons">
              link
             </i>
          </button>
          {/* .......................copy content is not working yet....................
           <div>
            <input type="text" ref="link" value={`${currentUrl}projectdetails/${project.id}`} />
             <span
              className="hide"
              ref={this.linkRef}> {`${currentUrl}projectdetails/${project.id}`}
            </span>
           </div> */}
         </span>

      </div>

      <div className="card-image post_image">
        <img src={project.imageUrl} alt="art" />
        <div className="postcredits_wrap">
          <PostCredits
            project={project}
            likeCount={likeCount}
            collected={collected}
            auth={auth}/>
        </div>
      </div>

      <div className="card-reveal">

        <span className="card-title grey-text text-darken-4">
          comments
          <i className="material-icons">close</i>
        </span>
          <div className="devider"></div>
        {comments && project
          ? <Comments
              projectId={project.id}
              comments={comments}/>
          : null
        }
      </div>

      <div className="card-content">
        <p className="grey-text date-format">
          {project.createdAt && project.createdAt
            .toDate()
            .toLocaleDateString('indian', {
              year: "numeric", month: "short", day: "numeric"
          })}
        </p>
        <p className="content"> {project.content} </p>
          <p className="grey-text lighten-2 load-comments activator">
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
//  console.log("proSum: ", state)
  const id = ownProps.project.id
  const comments = state.firestore.ordered[id]

  return {
    comments: comments,
    auth: state.firebase.auth
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
            collection: 'comments'
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
