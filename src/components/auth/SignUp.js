import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { signUpAction } from '../../store/actions/AuthActions'

class SignUp extends Component {
  // initializing state
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password:''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState(() => {
      return {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      }
    }, () => {
      console.log(this.state)
      this.props.signUp(this.state)
    })
  }

  render() {

    const { auth, err } = this.props // getting uid from props
    // redirecting signedIn user to home page
    if(auth.uid) return <Redirect to='/' />

    return(
      <div className="full-cover">
        <div className="container">
          <div className="row">
            <div className="col l6 offset-l3 m6 offset-m3 s10 offset-s1">
              <div className="sign_up_in-title">
                <span className=""> Sign Up </span>
              </div>
              <form className="sign-up sign-in" onSubmit={this.handleSubmit}>
                <div className="input-field">
                  <input id="first_name" type="text" ref="firstName" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field">
                  <input id="last_name" type="text" ref="lastName" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field">
                  <input id="email" type="email" ref="email" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input id="password" type="password" ref="password" />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field signup_btn_link">
                  <button className="btn black z-depth-0 sign-in-btn">Sign Up</button>
                  <span>
                    Have an account?
                    <Link to='signin' className="green-text">
                      &nbsp; Sign In
                    </Link>
                  </span>
                </div>
                <div className="auth-err">
                  { err ? <p className="red-text center"> { err } </p> : null }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// imoprting authentication user id from firebase to store
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    err: state.auth.authStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUpAction(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
