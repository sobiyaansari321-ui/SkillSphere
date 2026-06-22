import { useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import api from "../services/api.js"
import './ProjectDetails.css'

const ProjectDetails = () => {

  const { id } = useParams()

  const [ project , setProject ] = useState(null)

  useEffect( ()=> {
      const fetchProject = async () => {

    try{
      const response = await api.get(
        `/projects/${id}`
      )

      console.log(response.data)
      setProject(response.data)
    }

    catch (error) {
      console.log(error)
    }

  }

  fetchProject()

  }, [id])

  if (!project) {
    return <h2>Loading...</h2>
  }

  
  return (
    <div className="details-container">

      <h1 className="details-title">{project.title}</h1>

      <p className="details-description">
        {project.description}
      </p>

      <p className="details-skills">
        Skills : {project.requiredSkills.join(", ")}
      </p>

      <h3 className="section-title">Project Owner</h3>

      <div className="owner-card">
        <p>Name : {project.createdBy.name}</p>
        <p>Email : {project.createdBy.email}</p>
      </div>

      <h3 className="section-title">Collaborators</h3>
      {
        project.collaborators.length===0 ? (
          <p className="no-collab">No collaborators yet</p>
        ) : (
          project.collaborators.map( (user)=> (
            <div key={user._id} className="collaborator-card">
              <p className="collab-name">{user.name}</p>
              <p className="collab-email">{user.email}</p>
            </div>
          ))
        )
      }

    </div>
  )
}

export default ProjectDetails
