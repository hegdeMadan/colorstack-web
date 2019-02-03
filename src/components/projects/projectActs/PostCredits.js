import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createLike } from '../../../store/actions/LikeActions'
import share from '../../../static/icons/share.png'

class PostCerdits extends Component {
  constructor() {
    super()
    this.state = {
      likeToPost: '',
    }
  }

  incrementLike = () => {
    // console.log(this.props.likeCounts)
    this.setState(() => {
      return {
        likeToPost: this.props.projectId,
        likeCount: this.props.likeCount
      }
    }, () => {
      this.props.createLike(this.state)
    })
  }

  render() {
    const { likeCount } = this.props
    console.log(this.props.likeCount)
    return(
      <div>
      <div className="icons-wrapper">
        <div className="post-act">
          <span className="">
            <button onClick={this.incrementLike}>
              <i className="material-icons">thumb_up</i>
            </button>
          </span>
          <span className="">
            <button>
              <i className="material-icons">send</i>
            </button>
          </span>
        </div>
        <div className="save">
          <span className="">
            <i className="material-icons center"
                title="add to your collection">
              collections
            </i>
          </span>
        </div>
      </div>

          {likeCount
            ?
              <div className="counts">
                <span className="like-count">
                  {likeCount} likes
                </span>
              </div>
            : null
          }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createLike: (like) => dispatch(createLike(like))
  }
}


export default connect(null, mapDispatchToProps)(PostCerdits)
