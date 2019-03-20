export const uploadProfilePicture = (pictureUrl) => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const userId = getState().firebase.auth.uid

    firestore.collection('users').doc(userId)
    .update({
      pictureUrl
    })
    .then(() => {
      dispatch({type: 'UPLOAD_PROFILE_PICTURE', pictureUrl})
    })
    .catch((error) => {
      dispatch({type: 'UPLOAD_PROFILE_PICTURE_ERROR', error})
    })
  }
}
