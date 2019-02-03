export const createProject = (project) => {
  return (dispatch, getState , { getFirebase, getFirestore }) => {

    // adding data to firestore
    const firestore = getFirestore()
    const profile = getState().firebase.profile // retreiving user profile info
    const userId = getState().firebase.auth.uid // accessing user's user ID

    // adding data to firestore collection named 'projects'
    firestore.collection('projects').add({
      title: project.title,
      content: project.content,
      imageUrl: project.imageUrl,
      authorFirstName: profile.firstName,
      authorSecondName: profile.lastName,
      authorId: userId,
      createdAt: new Date()
    })
    .then(() => {
      dispatch({type:'CREATE_PROJECT', project })
    })
    .catch((err) => {
      dispatch({type:'CREATE_PROJECT_ERR', err })
    })
  }
}
