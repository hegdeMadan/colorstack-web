import React from 'react'
import Summary from '../Summary.js'
import UserDetails from './UserDetails.js'
// import About from './About'

const Bio = () => {
  return(
    <div>
      <div className="col l4 m4 s12">
        <Summary />
      </div>
      <div className="col l6 offset-l1 m8 s12">
        <UserDetails />
      </div>
      {/*<div className="about-wrapper">
        <About />
      </div>*/}
    </div>
  )
}

export default Bio
