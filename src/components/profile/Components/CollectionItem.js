import React from 'react'
import { Link } from 'react-router-dom'

const CollectionItem = ({art}) => {
  return(
    <div className="card z-depth-0 white user_collection">
    
      <Link to={art.authorId} className="black-text">
        <span className="col_username">
          <div className="btn z-depth-0 user-indicator">
            <span>
              {art.authorFirstName && art.authorFirstName[0]}
              {art.authorLastName && art.authorLastName[0]}
            </span>
          </div>
          <span className="user_name">
            {art.authorFirstName} {art.authorLastName}
          </span>
        </span>
      </Link>
      <div className="devider"></div>

      <img
        src={art.imageUrl}
        alt="your collection"
        className="responsive-img"/>

      <span className="goto">
        <Link to={`../projectdetails/${art.postId}`}>
          <i className="material-icons">
            arrow_forward
          </i>
        </Link>
      </span>

    </div>
  )
}

export default CollectionItem
