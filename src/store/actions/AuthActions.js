export const signInAction = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    let firebase = getFirebase() // initializing firebase

    // calling dispatch after passing credentials to firebase
    // and loggin user in
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}

// logging user out
export const signOutAction = () => {
  return(dispatch, getState, { getFirebase }) => {
    let firebase = getFirebase() // initializing firebase

    // dispatch is called from onclick on logout
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })
  }
}

// user signup storing user data into firebase
export const signUpAction = (newUser) => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase() // initializing firebase
    let firestore = getFirestore()

    // creating new user passing user details
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCESS' })
    }).catch((err) => {
      dispatch({type: 'SIGNUP_ERROR', err })
    })
  }
}
