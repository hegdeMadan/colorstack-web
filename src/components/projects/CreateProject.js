import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import { createProject } from '../../store/actions/ProjectActions'

class CreateProject extends Component {
  constructor() {
    super()
      this.state = {
        title: '',
        content: '',
        imageUrl:'',
        progress: 0
      }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { uid } = this.props.auth
    const image = this.refs.image.files[0]
    const storage = firebase.storage()
    const storageRef = storage.ref(`wallposts/${uid}` + image.name) // creating storage reference

    // inserting image to firestore
    const uploadTask = storageRef.put(image)
    uploadTask.on('state_changed',
    (snapshot) => {
      // catch image upload progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      this.setState({progress})
    },
    (error) => {
      console.log(error)
    },
    () => {
      // getting download url for the image
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        var imageUrl = url
        this.setState(() => {
          return {
            title: this.refs.title.value,
            content: this.refs.content.value,
            imageUrl
          }
        }, () => {
          this.props.createProject(this.state)
          this.props.history.push('/')
        })
      })
    })
  }


  render() {
    // getting uid from props
    const { auth } = this.props
    if(!auth.uid) return <Redirect to='/signin' /> // redirecting signedOut user to signin page
    return(
      <div className="container">
        <div className="row">
          <form className="col m10 offset-m1 sign-in" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Create a New Project</h5>
            <div className="input-field">
              <input type="text" id='title' ref="title" />
              <label htmlFor="title">Project Title</label>
            </div>

            <div className="file-field input-field">
              <div className="btn">
                <input type="file" ref="image" id="imagePath" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="choose image" />
              </div>
            </div>

            <div className="input-field">
              <textarea id="content" ref="content" className="materialize-textarea" ></textarea>
              <label htmlFor="content">Project Content</label>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1">Create</button>
            </div>
          </form>
          <div className="container row">
          <div className="upload-progress col l6 offset-l3">
            <label htmlFor="progress"> Sit back! File's being uploaded </label>
            <progress id="progress" value={this.state.progress} max="100" className="progress-bar"> </progress>
          </div>
          { this.state.progress
            ? <div className="upload-progress col l6 offset-l3">
                <label htmlFor="progress"> Sit back! File's being uploaded </label>
                <progress id="progress" value={this.state.progress} max="100" />
              </div>
            : null
          }
          </div>
        </div>
      </div>
    )
  }
}

// retrieving aut uid from firebase to store passing it as props
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
