import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentDetails from './CommentDetails'

class Comments extends Component {

  render(){
  // console.log("comments: ", comments)
    const { comments, projectId } = this.props
    return(
      <div>
        <div className="loaded-comments">
          {comments && comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CommentDetails
                  comment={comment}
                  projectId={projectId}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log("state: ", state)
  return {
    // profile:
  }
}


export default connect(mapStateToProps)(Comments)
