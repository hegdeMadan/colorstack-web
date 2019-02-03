import React from 'react'
import ProjectSummary from './ProjectSummary'

const ProjectList = ({ projects }) => {
  // console.log("pro: ", projects)
  return(
      <div className="project-list section">
        {projects && projects.map((project) => {
          return(
            <div key={project.id}>
               <ProjectSummary project={project} />
            </div>
          )
        })}
      </div>
  )
}

export default ProjectList
