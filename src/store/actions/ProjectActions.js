export const createProject = (project) => {
  return (dispatch, getState , { getFirebase, getFirestore }) => {

    console.log("image: ", project.image)
    // adding data to firestore
    const firestore = getFirestore()
    const firebase = getFirebase()
    const profile = getState().firebase.profile // retreiving user profile info
    const userId = getState().firebase.auth.uid // accessing user's user ID

    // firebase.storage()
    const image = project.image // getting file
    const storage = firebase.storage()
    const storageRef = storage.ref(`wallposts/${userId}` + image.name) // creating storage reference

    // inserting image to firestore
    const uploadTask = storageRef.put(image)
    uploadTask.then((snapshot) => {
      console.log('image has been inserted')
      dispatch({type: 'UPLOAD_IMAGE', project})
      getImageUrl()
    })
    .catch((err) => {
      console.log('error occured', err)
      dispatch({type: 'UPLOAD_ERR', err})
    })

    var imageUrl = ''
    const getImageUrl = () => {
      // reference to the image to get download Url
      uploadTask.snapshot.ref.getDownloadURL()
        .then(url => {
          imageUrl = url
          // adding data to firestore collection named 'projects'
          firestore.collection('projects').add({
            title: project.title,
            content: project.content,
            imageUrl,
            authorFirstName: profile.firstName,
            authorSecondName: profile.lastName,
            authorId: userId,
            createdAt: new Date()
          }).then(() => {
            dispatch({type:'CREATE_PROJECT', project })
          }).catch((err) => {
            dispatch({type:'CREATE_PROJECT_ERR', err })
          })
        })
    }
  }
}
