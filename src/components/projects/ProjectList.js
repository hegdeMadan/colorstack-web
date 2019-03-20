import React from 'react'
import ProjectSummary from './ProjectSummary'

const ProjectList = ({ projects, auth }) => {
  // console.log("pro: ", projects)
  return(
      <div className="project-list section">
        {projects && projects.map((project) => {
          return(
            <div key={project.id}>
               <ProjectSummary project={project} auth={auth} />
            </div>
          )
        })}
      </div>
  )
}

export default ProjectList
