import React from 'react'
import { Link } from 'react-router-dom'

const Comments = ({projectId, comments}) => {
  // console.log("comments: ", comments)
  return(
    <div>
      <div className="loaded-comments">
        {comments && comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>
                <Link to={'/profile/' + comment.commentFromId}>
                  <span className="commentor green-text darken-1">
                    {comment.commentFrom}
                  </span>
                </Link>
                <span>{comment.comment}</span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// const mapStateToProps = (state, ownProps) => {
//   console.log("state: ", state)
//   return {
//
//   }
// }


export default Comments
