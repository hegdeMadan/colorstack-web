import React from 'react'
import abstract from '../../static/abstract.jpg'
import art from '../../static/art.jpg'
import wallArt from '../../static/wallArt.jpg'

const ProjectSummary = ({project}) => {
  return(
    <div className="card z-depth-0 project-summary show-up">
      <div className="card-image">
        <img src={wallArt} alt="art"/>
      </div>
      <div className="card-content">
        <p> {project.content} </p>
      </div>
      {/* <span className="card-title"> {project.title} </span> */ }
      <p className="grey-text"> Posted by {project.authorFirstName} {project.authorSecondName} </p>
      <p className="grey-text"> {project.createdAt.toDate().toLocaleDateString('indian', {year: "2-digit", month: "short", day: "numeric"})} </p>
    </div>
  )
}

export default ProjectSummary
