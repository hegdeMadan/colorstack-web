import React from 'react'
import { Link } from 'react-router-dom'

const FollowingList = ({ following }) => {
  console.log(following)
  return (
    <div className="following_wrapper">
      <div className="card z-depth-0 white following_ing">
        {following && following.length > 0
          ? <div>
            {following && following.map(following => {
              return(
              <div key={following.id}>
                <Link to={'../profile/' + following.userid}>
                  <ul>
                    <li><span>
                        {following.name}
                    </span></li>
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

export default FollowingList
