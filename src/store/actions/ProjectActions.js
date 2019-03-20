export const createProject = (project) => {
  return (dispatch, getState , { getFirebase, getFirestore }) => {

    // adding data to firestore
    const firestore = getFirestore()
    const profile = getState().firebase.profile // retreiving user profile info
    const userId = getState().firebase.auth.uid // accessing user's user ID
    const category = project.type ? project.type : 'other'

    // adding data to firestore collection named 'projects'
    firestore.collection('projects').add({
      content: project.content,
      imageUrl: project.imageUrl,
      authorFirstName: profile.firstName,
      authorSecondName: profile.lastName,
      authorId: userId,
      category,
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

export const createAlbum = (album) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {

    console.log("createAlbum: ", album)
    const firestore = getFirestore()
    const firebase = getFirebase()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid // accessing user's user ID
    const imageUrl = album.imageUrl ? album.imageUrl : null
    const dp = album.authorProfilePicture ? album.authorProfilePicture : null

    if(album.albumId) {
      console.log("isAlbumId: ", album)
      firestore.collection('albums')
        .doc(album.albumId)
        .update({
          photos: firebase.firestore.FieldValue.arrayUnion(album.imageUrl)
        })
        .then(() => {
          dispatch({type:'CREATE_PROJECT', album })
        })
        .catch((err) => {
          dispatch({type:'CREATE_PROJECT_ERR', err })
        })

    } else if(imageUrl) {
      console.log("isNewAlbum: ", album)
      firestore.collection('albums').add({
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: userId,
        albumName: album.albumName,
        content: album.content,
        photos: [album.imageUrl],
        authorProfilePicture: dp,
        time: new Date()
      })
      .then(() => {
        dispatch({type:'CREATE_PROJECT', album })
      })
      .catch((err) => {
        dispatch({type:'CREATE_PROJECT_ERR', err })
      })

    }
  }
}
