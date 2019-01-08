const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// creating new collection "notifications" to store activity of user's project creation
const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log("notification doc created", doc))
})


// retreiving data of new projects created
// here we are to notify users when anyone creates a new project
exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const projectData = doc.data() // retreiving newly created document's data
    const notificationContent = {
      content: 'Added a new project',
      user: `${projectData.authorFirstName} ${projectData.authorSecondName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notificationContent)
  })

// retreiving data of the new user
// this will help to notify users when new user is created
exports.userJoined = functions.auth.user()
  .onCreate(user => {

    // getting indivisual document belongs to the newly created user to get data
    return admin.firestore().collection('users')
      .doc(user.uid).get()
      .then((doc) => {

        const userData = doc.data() // retreiving newly created user-data from the document
        const notificationContent = {
          content: "User joined",
          user: `${userData.firstName} ${userData.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notificationContent)
      })
  })
