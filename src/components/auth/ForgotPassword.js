import React, { Component } from 'react'
import { connect } from 'react-redux'
import { recoverPassword } from '../../store/actions/AuthActions'

class ForgotPassword extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const email = this.refs.email.value
    console.log("email: ", email)
    this.setState(() => {
      return{
        email: email
      }
    }, () => {
      this.props.recoverPassword(this.state)
    })
  }

  render() {
    return(
      <div className="container email" onSubmit={this.handleSubmit}>
        <div className="row">
          <form className="col l6 offset-l3 white">
            <label htmlFor="email"> Enter your Email to recover password </label>
            <input ref="email" id="email" type="email" placeholder="Email" />
            <span className="green-text">
              Password recovery link will be sent to your email-id
            </span>
            <button className="btn z-depth-0 black"> Verify </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recoverPassword: (email) => dispatch(recoverPassword(email))
  }
}

export default connect(null, mapDispatchToProps)(ForgotPassword)
