import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, /*Link*/ } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ProfilePicture from './ProfilePicture'
import Bio from './TabContents/Bio'
import Followers from './TabContents/Followers'
import ArtWork from './TabContents/ArtWorks'
import Collections from './TabContents/Collections'

class Profile extends Component {
  constructor() {
    super()
    this.state = { }
  }

  handleClick = (item) => {
    this.setState(() => {
      return {
        item
      }
    })
  }

  render() {
    const { auth } = this.props
    // const { profile } = this.props
    const { item } = this.state
    // console.log("par: ", this.props.user)
    if(!auth.uid) return <Redirect to='/signin' />

    let tab
    if(item === 'Followers') {
      tab = <Followers
      following={this.props.following}
      followers={this.props.followers}/>
    } else if(item === 'Art Works') {
        tab = <ArtWork artWork={this.props.artWorks} />
    } else if(item === 'Collections') {
      tab = <Collections collection={this.props.collection} />
    } else {
      tab = <Bio />
    }

    return(
      <div className="profile-wrapper">
        <div className="row">

          <div className="col l12 m12 s12 profile_picture-container">

            <div>
              <ProfilePicture
                onClick={this.handleClick}
                uid={this.props.auth.uid}
                urlId={this.props.match.params.id}
                profile={this.props.profile}/>
            </div>

          </div>

          <div className="tab-content-wrapper">
            <div className="col l12 m12 s12 multi-tab">
              {tab}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('following', state)
  const profileStore = state.firestore.ordered.userProfile
  const profile = profileStore ? profileStore[0] : null
  // console.log("profile: ", profile)
  return {
    auth: state.firebase.auth,
    profile: profile,
    artWorks: state.firestore.ordered.artWork,
    collection: state.firestore.ordered.collection,
    following: state.firestore.ordered.following,
    followers: state.firestore.ordered.followers
  }
}

export default compose (
  firestoreConnect(props => {
    return [
      {collection: 'projects',
        where: [
          ['authorId', '==', props.match.params.id]
        ],
        storeAs: 'artWork',
        orderedBy: ['createdAt', 'desc']},

      {collection: 'users',
        doc: props.match.params.id,
        subcollections: [{
          collection: 'collection'
        }],
        storeAs: 'collection',
        orderedBy: ['time', 'desc']},

      {collection: 'users',
        doc: props.match.params.id,
        storeAs: 'userProfile'},

      {collection: 'users',
        doc: props.match.params.id,
        subcollections: [{
          collection: 'following'
        }],
        storeAs: 'following'},

        {collection: 'users',
          doc: props.match.params.id,
          subcollections: [{
            collection: 'followers'
          }],
          storeAs: 'followers'
        }
    ]
  }),
  connect(mapStateToProps)
)(Profile)

// export default Profile
