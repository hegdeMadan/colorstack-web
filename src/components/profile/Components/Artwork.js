import React from 'react'
import ProjectList from '../../projects/ProjectList'

const Artwork = ({artWorks, auth}) => {
  return (
    <div className="art_sec">
      { artWorks && artWorks.length > 0
        ? <ProjectList projects={artWorks} auth={auth} />
        : <div className="no_post card z-depth-0 white">
            <span> <i>Has not posted anything yet!</i> </span>
          </div> }
    </div>
  )
}

export default Artwork
