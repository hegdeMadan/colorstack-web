export const createLike = (like) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid
    const projectId = like.likeToPost
    let likeCount = like.likeCount + 1

    firestore.collection('projects').doc(projectId)
    .collection('likes')
    .add({
      likeToPost: like.likeToPost,
      likeFromId: userId,
      likeFrom: `${profile.firstName} ${profile.lastName}`,
      likeTime: new Date()
    })
    .then(() => {
      dispatch({type: 'CREATE_LIKE', like})
        firestore.collection('projects').doc(projectId)
        .update({
          likeCount: likeCount
        })
    })
    .catch((error) => {
      dispatch({type: 'CREATE_LIKE_ERROR', error})
    })
  }
}
