import React from 'react'
import { Link } from 'react-router-dom'

const FollowersList = ({ followers }) => {
  return (
    <div>
      <div className="card z-depth-0 white following_ing">
        {followers && followers.length > 0
          ? <div>
            {followers && followers.map(followers => {
              return(
              <div key={followers.id}>
                <Link to={'../profile/' + followers.userid}>
                    <ul>
                      <li>
                        <span>
                          {followers.name}
                        </span>
                      </li>
                    </ul>
                </Link>
              </div>
              )
            })}
            </div>
          : <div><span>nothing yet</span></div>}
      </div>
    </div>
  )
}

export default FollowersList
