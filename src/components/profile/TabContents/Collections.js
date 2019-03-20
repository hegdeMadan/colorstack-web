import React from 'react'
import { Link } from 'react-router-dom'
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux'
// import { connect } from 'react-redux'

const Collections = ({ collection }) => {
  return(
    <div className="collection-wrap card z-depth-0">
      { collection && collection.length > 0
        ? collection && collection.map((collection) => {
          return (
            <div key={collection.id}>
              {collection.isActive
                ? <div className="collection col l6 m6 s12 arts">
                  <Link to={'/projectdetails/' + collection.postId}>
                    <img
                      src={collection.imageUrl}
                      alt="collection"
                      className="responsive-img"/>
                  </Link>
                </div>
                : null
              }
            </div>
          )
        })
        : <div>
            <p className="grey-text center">
            <b>  Save posts to your collection and let the world see what you love! </b>
              <br/>
             Anyone who visits here can view your collections
            </p>
          </div>
      }
    </div>
  )
}

// const mapStateToProps = (state, ownProps) => {
//   console.log("coll: ", ownProps.match.params.id)
//   return{
//
//   }
// }

// export default compose(
//   firestoreConnect(props => {
//     return[
//       {
//         collection: 'users',
//         doc: 'sds',
//         subcollections: [
//           {
//             collection: 'collection'
//           }
//         ],
//         storeAs: 'collection'
//       }
//     ]
//   }),
//   connect(mapStateToProps)
// )(Collections)

export default Collections
