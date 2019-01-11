import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

 // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBxCqVbDzlntngs45istem-SwrLdnjEDPo",
    authDomain: "react-redux-blogg.firebaseapp.com",
    databaseURL: "https://react-redux-blogg.firebaseio.com",
    projectId: "react-redux-blogg",
    storageBucket: "react-redux-blogg.appspot.com",
    messagingSenderId: "644792013213"
  };

  firebase.initializeApp(config);
  firebase.storage()
  firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase
