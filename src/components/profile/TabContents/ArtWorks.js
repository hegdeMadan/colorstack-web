import React from 'react'
import { Link } from 'react-router-dom'

const ArtWork = (props) => {
  const { artWork } = props
  return(
    <div className="artwork-wrap card z-depth-0">
      { artWork && artWork.length > 0
        ? artWork && artWork.map((artWork, index) => {
          return(
            <Link to={'../projectdetails/' + artWork.id} key={index}>
              <div className="col l6 m6 s12 arts">
                <img src={artWork.imageUrl} alt="art" className="responsive-img"/>
              </div>
            </Link>
          )
        })
        : <div>
            <p className="grey-text center">
              Have not posted any works yet
            </p>
          </div>
      }
    </div>
  )
}

export default ArtWork
