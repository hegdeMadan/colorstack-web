import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import Navbar from '../layout/Navbar'
import { signInAction } from '../../store/actions/AuthActions'
import { signInWithGoogle, addUserAfterGoogleSignIn } from '../../store/actions/AuthActions'
import { Redirect } from 'react-router-dom'
import SignInWithProvider from './signInWithProvider'
import Intro from '../layout/Intro'

class SignIn extends Component {
  state = {
      email: '',
      password: ''
  }

  handleClick = () => {
    // firebase.auth().onAuthStateChanged(data => {
    //   console.log("data", data)
    //     addUserAfterGoogleSignIn()
    // })
    this.props.signInWithGoogle()
    //alert("hhhh")
  }

  componentWillMount = () => {
    // firebase.auth().getRedirectResult().then(data => {
    //   console.log("data", data)
    //   this.props.addUserAfterGoogleSignIn()
    // })
    firebase.auth().onAuthStateChanged(user => {
      console.log("data", user)
      this.props.addUserAfterGoogleSignIn()
    })
  }

  // changing state on submitting form
  handleSubmit = (e) => {
    e.preventDefault()
    const email = this.refs.email.value
    const password = this.refs.password.value

    if(email && password) {
      this.setState(() => {
        return {
          email,
          password
        }
      }, () => {
        this.props.signIn(this.state) // passing state to the dispatch method
      })
    }
  }

  render() {
    const { err, auth } = this.props // error message
    if(auth.uid) return <Redirect to='/' />
    return(
      <div>
        <div className="full-cover">

                <Intro />

              <div className="sign_in-form">

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
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    addUserAfterGoogleSignIn: () => dispatch(addUserAfterGoogleSignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
