import React from 'react'

const SignInWithProvider = (props) => {

  function fireGoogle() {
    props.onClick()
  }
  // function fireFacebook() {
  // alert("Works")
  // }

  return(
    <div>
      <div className="input-field g-signin provider_signin">
        <span className="btn z-depth-0 sign-in-btn"
          onClick={fireGoogle}>
          <span>
            <i className="fab fa-google"></i>
          </span>
          <span onClick={fireGoogle}>Signin With Google</span>
        </span>
      </div>
      {/*
        <div className="input-field fb-signin provider_signin">
          <span className="btn z-depth-0 sign-in-btn"
            onClick={fireFacebook}>
            <span>
              <i className="fab fa-facebook"></i>
            </span>
            <button>Signin With Facebook</button>
          </span>
        </div>
        */}
    </div>
  )
}

export default SignInWithProvider
