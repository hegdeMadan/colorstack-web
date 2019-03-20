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

export const commentReply = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid
    const { projectId } = data
    const { commentId } = data
    console.log(projectId, commentId)

    firestore.collection('projects').doc(projectId)
    .collection('comments').doc(commentId)
    .collection('reply')
    .add({
      replyContent: data.replyContent,
      replyFromId: userId,
      replyFrom: `${profile.firstName} ${profile.lastName}`,
      time: new Date(),
      isHidden: false
    })
  }
}
