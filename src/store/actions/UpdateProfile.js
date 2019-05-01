export const UpdateProfile = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid

    firestore.collection('users').doc(uid)
    .update({
      ...data
    })
    .then(_ => {
      dispatch({type: 'PROFILE_UPDATE', data})
    })
    .catch(error => {
      dispatch({type:'PROFILE_UPDATE_ERR', error})
    })
  }
}
