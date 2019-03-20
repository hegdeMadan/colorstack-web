import authReducer from './authReducer'
import projectReducer from './projectReducer'
import profileReducer from './profileReducer'
import likeReducer from './likeReducer'
import collectionReducer from './collectionReducer'
import profilePictureUpload from './profilePictureUpload'
import followReducer from './profilePictureUpload'
import posts from './postRetrieveReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

// combining reducers all here
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  profile: profileReducer,
  posts: posts,
  likes: likeReducer,
  profilePicture: profilePictureUpload,
  following: followReducer,
  collection: collectionReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
