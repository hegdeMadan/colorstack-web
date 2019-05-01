import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

 // Initialize Firebase
   const config = {
    apiKey: "AIzaSyDZix2HpzsVrfT9UhSyzVdMXOwrEO67hDQ",
    authDomain: "thecolorstack.firebaseapp.com",
    databaseURL: "https://thecolorstack.firebaseio.com",
    projectId: "thecolorstack",
    storageBucket: "thecolorstack.appspot.com",
    messagingSenderId: "510882193988"
  }

  firebase.initializeApp(config);
  firebase.storage()
  firebase.firestore()
export default firebase
