export const createProject = (project) => {
  return (dispatch, getState , { getFirebase, getFirestore }) => {
    // console.log('project: ', project)

    // adding data to firestore
    const firestore = getFirestore()
    const profile = getState().firebase.profile // retreiving user profile info
    const userId = getState().firebase.auth.uid // accessing user's user ID
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorSecondName: profile.lastName,
      authorId: userId,
      createdAt: new Date()
    }).then(() => {
      dispatch({type:'CREATE_PROJECT', project })
    }).catch((err) => {
      dispatch({type:'CREATE_PROJECT_ERR', err })
    })
  }
}
