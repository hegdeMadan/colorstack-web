import React from 'react'
import logo from '../../static/logohome.png'

const Intro = () => {
  return (
    <div className="intro_cover">
      <div className="intro_logo_wrapper">
        <div className="intro_logo">
          <img src={logo} alt="logo" width="280px" height="80px" />
        </div>
      </div>
    </div>
  )
}

export default Intro
