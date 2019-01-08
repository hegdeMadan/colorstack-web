// initializing store
const initState = {
  auth: null
}

// changing store after dispatch is called
const authReducer = (state = initState, action) => {
  // handling cases of singing in
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log("login error")
      return {
        ...state,
        authStatus: "Email or Password you entered is incorrect!"
      }
    case 'LOGIN_SUCCESS':
      console.log("Login Success")
      return {
        ...state,
        authStatus: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log("signout success")
      return state
    case 'SIGNUP_SUCESS':
      console.log("signup success")
      return {
        ...state,
        authStatus: null,
      }
    case 'SIGNUP_ERROR':
      console.log("signup error")
      return {
        ...state,
        authStatus: action.err.message
      }
    default:
      return state
  }
}

export default authReducer
