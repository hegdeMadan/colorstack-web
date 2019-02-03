export const UpdateProfile = (profileDetails) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore() // initializing firestore
    const userId = getState().firebase.auth.uid

    // updating user information
    firestore.collection('users').doc(userId).update({
      Phone: profileDetails.Phone,
      UserName: profileDetails.userName
    })
    .then(() => {
      dispatch({type: 'UPDATE_PROFILE', profileDetails})
    })
    .catch((err) => {
      dispatch({type: 'UPDATE_PROFILE_ERR'}, err)
    })
  }
}
