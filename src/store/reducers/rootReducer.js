import authReducer from './authReducer'
import projectReducer from './projectReducer'
import profileReducer from './profileReducer'
import likeReducer from './likeReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

// combining reducers all here
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  profile: profileReducer,
  likes: likeReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
