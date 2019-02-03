export const createComment = (comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {


    const firestore = getFirestore()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid
    const projectId = comment.commentToPost

    firestore.collection('projects').doc(projectId)
    .collection('comments')
    .add({
      ...comment,
      commentFromId: userId,
      commentFrom: `${profile.firstName} ${profile.lastName}`,
      commentTime: new Date()
    })
    .then(() => {
      dispatch({type: 'CREATE_COMMENT', comment})
    })
    .catch((error) => {
      dispatch({type: 'CREATE_COMMENT_ERROR', error})
    })
  }
}
