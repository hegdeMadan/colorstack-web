import React from 'react'
import { Link } from 'react-router-dom'

const ProjectSummary = ({project }) => {
  return(
    <div className="card z-depth-0 project-summary show-up">

      <div className="name">
        <span className="">
          <span className="btn btn-floating z-depth-0 black user-indicator">
            {project.authorFirstName[0]}{project.authorSecondName[0]}
          </span>
          {project.authorFirstName} {project.authorSecondName}
        </span>
      </div>        <div className="card-image">
          <img src={project.imageUrl} alt="art" className="materialboxed"/>
        </div>
      <div className="card-content">
      <Link to={'/projectdetails/' + project.id} className="black-text">
        <p> {project.content} </p>
      </Link>
        <p className="grey-text date-format"> {project.createdAt.toDate().toLocaleDateString('indian', {year: "numeric", month: "short", day: "numeric"})} </p>
      </div>
      {/* <span className="card-title"> {project.title} </span>
      <p className="grey-text"> Posted by {project.authorFirstName} {project.authorSecondName} </p> */ }
    </div>
  )
}

export default ProjectSummary
