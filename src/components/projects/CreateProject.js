import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProject } from '../../store/actions/ProjectActions'

class CreateProject extends Component {
  constructor() {
    super();
      this.state = {
        title: '',
        content: '',
        image:''
      }
  }
   // listening to file selection
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.id]: e.target.files[0]
  //   }, () => {
  //     console.log("state: ", this.state)
  //   })
  // }

  // handling on submit
  handleSubmit = (e) => {
    e.preventDefault()
      this.setState({
          title: this.refs.title.value,
          content: this.refs.content.value,
          image: this.refs.image.files[0]
      }, () => {
        console.log(this.state)
        this.props.createProject(this.state)
        this.props.history.push('/')
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
              <div className="file">
                <input type="file" ref="image" id="imagePath" />
              </div>
            <div className="input-field">
              <textarea id="content" ref="content" className="materialize-textarea" ></textarea>
              <label htmlFor="content">Project Content</label>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1">Create</button>
            </div>
          </form>
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
