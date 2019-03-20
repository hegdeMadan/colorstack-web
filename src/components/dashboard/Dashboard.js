import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
// import Notification from './Notification'
import ProjectList from '../projects/ProjectList'
import { Album } from '../projects/Album'
// import Footer from './Footer'
import Spinner from './Spinner'
import CreatePost from '../projects/CreatePost'
import Category from './Category'
import Users from './Users'
const post = []
const users = []

class Dashboard extends Component {
  constructor() {
    super()
    this.lastVisible = ''
    this.state = {
      isAlbumSelected: false
    }
  }

  // TODO: get the posts manually and dispatch it
  // to the store
  // TODO: set data to local storage once component
  // successfully mounted

  componentWillMount() {
    this.getPosts()
    this.getUsers()
  }

  getUsers = () => {
    const db = firebase.firestore()

    return db.collection('users')
      .orderBy('firstName')
      .get().then(documentSnapshots => {
        documentSnapshots.forEach(doc => {
          let obj = {
            ...doc.data(),
            id: doc.id
          }
          users.push(obj)
          this.setState(() => {
            return {
              users: users
            }
          })
        })
      })
  }

  renewPost = () => {
    const db = firebase.firestore()
    const lastVisible = this.lastVisible ? this.lastVisible : false

    if(this.lastVisible) {
      return db.collection('projects')
        .orderBy('createdAt', 'desc')
        .startAfter(lastVisible)
        .limit(5)
        .get().then(documentSnapshots => {

          // getting the last visible document for pagination
          this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

          documentSnapshots.forEach((docs) => {
            let obj = {
              ...docs.data(),
              id: docs.id
            }
            post.push(obj)
            this.setState(() => {
              return {
                posts: post
              }
            })
          })
        })
    }
  }

  getPosts = () => {
    const uid = this.props.auth.uid
    if(uid) {

      const db = firebase.firestore()

      // getting posts of "folowing users"
      return db.collection('projects')
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get().then(documentSnapshots => {

          // getting the last visible document for pagination
          this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

          documentSnapshots.forEach((docs) => {
            let obj = {
              ...docs.data(),
              id: docs.id
            }
            post.push(obj)
            this.setState(() => {
              return {
                posts: post
              }
            })
          })
        })
    } else {
      return(
        <Redirect to='/signin' />
      )
    }

  }

  render() {
  // console.log("project: ", this.state)
    // console.log("st: ", this.state)
    const { auth } = this.props
    const { posts } = this.state
    if (!auth.uid) return <Redirect to='/signin' /> // redirecting signed out users to signin/signup page
    // if(this.state.isAlbumSelected)
    if(!posts) {
      return(
        <div className="spinner_wrapper">
          <Spinner />
        </div>
      )
    } else {
      return(
        <div className="dashboard container">
          <div className="row">
            <div className="col l1 m12 s12 hide-on-med-and-down hide-993">
              <Category />
            </div>
            <div className="col l5 offset-l1 m12 s12">

              <div className="hide-on-large-only">
                <CreatePost />
              </div>
              {/*<div>
                <Album />
              </div>*/}
              {posts
                ? <div>
                    <ProjectList projects={posts} auth={auth}/>
                    <div
                      className="load_more"
                      onClick={this.renewPost}>
                      <span>
                        Load More
                        <i className="material-icons">autorenew</i>
                      </span>
                    </div>
                  </div>
                : null}
            </div>
            <div className="col l4 offset-l1 hide-on-med-and-down">
                {/*<Notification notifications={notifications} />*/}
              <CreatePost />
              {users
                ? <div>
                    <Users users={users} />
                  </div>
                : null}
            </div>
          </div>
          <div className="footer-cover">
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    projects: state.firestore.ordered.projects,
    initials: state.firebase.profile.initials,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose (
  firestoreConnect([
      { collection: 'projects',
        orderBy: ['createdAt', 'desc']
      },
      { collection: 'notifications',
        limit: 3,
        orderBy: ['time', 'desc']
      }
    ]),
  connect(mapStateToProps)
)(Dashboard)
