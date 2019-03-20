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
        initials: newUser.firstName[0] + newUser.lastName[0],
        time: new Date()
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCESS' })
    }).catch((err) => {
      dispatch({type: 'SIGNUP_ERROR', err })
    })
  }
}

export const recoverPassword = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const auth = firebase.auth()
    const emailId = email.email

    auth.sendPasswordResetEmail(emailId)
    .then(() => {
      console.log("link has been sent")
    })
    .catch((error) => {
      console.log("error", error)
    })
  }
}

export const signInWithGoogle = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    const provider = new firebase.auth.GoogleAuthProvider()

    // firebase.auth().signInWithPopup(provider)
    firebase.auth().signInWithRedirect(provider)
    firebase.auth().getRedirectResult().then((result) => {
      // TODO: check if user has a profile picture already
      // existed and don't put google user profile picture
      // if so
      const user = result.user
      const fullName = user.displayName
      const finalName = fullName.split(" ")
      const firstname = finalName[0]
      const lastname = finalName[1]
      const url = user.photoURL

      firestore.collection('users').doc(user.uid).set({
        firstName: firstname,
        lastName: lastname,
        initials: `${firstname[0]}${lastname[0]}`,
        pictureUrl: url
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCESS' })
        console.log("success adding user!", `${firstname[0]} ${lastname[1]}`)
      }).catch((err) => {
        dispatch({type: 'SIGNUP_ERROR', err })
      })

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("google errorCode: ", errorCode)

      const errorMessage = error.message;
      console.log("google err: ", errorMessage)
      // The email of the user's account used.
      const email = error.email;
      console.log("google mail: ", email)
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log("google cred: ", credential)
    });
  }
}

// export const googleSignIn = () => {
//   return(dispath, getState, { getFirebase, getFirestore}) => {
//
//   }
// }
