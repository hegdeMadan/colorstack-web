import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signInAction } from '../../store/actions/AuthActions'
import { signInWithGoogle } from '../../store/actions/AuthActions'
import { Redirect } from 'react-router-dom'
import SignInWithProvider from './signInWithProvider'

class SignIn extends Component {
  state = {
      email: '',
      password: ''
  }

  handleClick = () => {
    this.props.signInWithGoogle()
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
      <div className="full-cover">
        <div className="container">
          <div className="row">
            <div className="col l6 offset-l3 m6 offset-m2 s10 offset-s1 sign_in-form">
              <div className="sign_up_in-title">
                <span className=""> Sign In </span>
              </div>
              <form className="sign-in" onSubmit={this.handleSubmit}>
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
                  <SignInWithProvider onClick={this.handleClick} />
                <div> { err ? <p className="red-text darken-5">{err}</p> : null } </div>
                <div className="ac_forgot">
                  <span>
                    Don't have an account?
                    <Link to='signup' className="green-text" > SignUp </Link>
                  </span>
                  <span>
                    <Link
                      to='forgotpassword'
                      className="blue-text">
                      Forgot Password?
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
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
    signIn: (creds) => dispatch(signInAction(creds)),
    signInWithGoogle: () => dispatch(signInWithGoogle())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
