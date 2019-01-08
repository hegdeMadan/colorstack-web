import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signInAction } from '../../store/actions/AuthActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state = {
      email: '',
      password: ''
  }

  // changing state on submitting form
  handleSubmit = (e) => {
    e.preventDefault()

    this.setState(() => {
      return {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
    }, () => {
      this.props.signIn(this.state) // passing state to the dispatch method
    })
  }

  render() {
    const { err, auth } = this.props // error message
    if(auth.uid) return <Redirect to='/' />
    return(
      <div className="container">
        <div className="row">
          <form className="col m6 offset-m2 sign-in" onSubmit={this.handleSubmit}>
            <h5 className="signin-logo"> Sign In </h5>
            <div className="input-field">
              <input id="email" type="email" ref="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input id="password" type="password" ref="password" />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field">
              <button className="btn grey darken-3 z-depth-0 sign-in-btn">Login</button>
            </div>
            <div> { err ? <p className="red-text darken-5">{err}</p> : null } </div>
          </form>
        </div>
      </div>
    )
  }
}

// accessing error message from the authReducer
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    err: state.auth.authStatus,
    auth: state.firebase.auth
  }
}

// calling despatch attaching state
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signInAction(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
