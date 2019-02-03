import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { UpdateProfile } from '../../store/actions/UpdateProfileActions'

class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      Phone: '',
      userName: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("val: ", this.refs.phone.value)
    this.setState(() => {
      return{
        Phone: this.refs.phone.value,
        userName: this.refs.userName.value
      }
    }, () => {
      // console.log("state: ", this.state)
      this.props.UpdateProfile(this.state)
      this.props.history.push('/profile')
    })
  }

  render() {
    const { auth } = this.props
    if(!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="edit-profile-container container section">
        <div className="row">
          <form className="col l10 offset-l1 m10 offset-m1 s12 white card z-depth-0" onSubmit={this.handleSubmit}>
            <div className="row edit-pro">
              <div className="input-field col l6 offset-l3 m6 offset-m3 s6">
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text" ref="userName" className="validate" />
                <label htmlFor="icon_prefix">User Name</label>
              </div>
              <div className="input-field col l6 offset-l3 m6 offset-m3 s6">
                <i className="material-icons prefix">phone</i>
                <input id="icon_telephone" type="tel" ref="phone" className="validate" />
                <label htmlFor="icon_telephone">Telephone</label>
              </div>
              <div className="col l6 m6 push-l3 push-m3 input-field">
                <button className="btn z-depth-0"> Cancel </button>
              </div>
              <div className="col l6 m6 input-field">
                <button className="btn z-depth-0"> Update Profile </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log("dispatch: ", dispatch)
  return {
    UpdateProfile: (profileDetails) => dispatch(UpdateProfile(profileDetails))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
