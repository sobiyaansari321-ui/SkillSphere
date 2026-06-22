import { useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import api from "../services/api.js"
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./EditProject.css"

const EditProject = () => {

    const { id } = useParams()

    const [ title , setTitle ] = useState("")
    const [ description , setDescription ] = useState("")
    const [ requiredSkills , setRequiredSkills ] = useState("")

    const navigate = useNavigate()

    useEffect( ()=> {
        const fetchProject = async () => {

            try{
                const response = await api.get(
                    `/projects/${id}`
                )

                const project = response.data
                setTitle(project.title)
                setDescription(project.description)
                setRequiredSkills(
                    project.requiredSkills.join(", ")
                )
            }

            catch (error) {
                console.log(error)
            }
        }

        fetchProject()
    },[id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const token = localStorage.getItem("token")

            const response = await api.put(
                `/projects/${id}`,
                {
                    title,
                    description,
                    requiredSkills: requiredSkills.split(",")
                },
                {
                    headers:{
                        Authorization:token,
                    },
                }
            );

            console.log(response.data)
            alert("Project Updated")
            navigate('/my-projects')
        }

        catch (error) {
            console.log(error)
        }
    }

  return (

    <div className="edit-project-container">

    <div className="edit-project-card">

      <h1 className="edit-project-title">
        Edit Project <FaPencilAlt /> 
      </h1>

      <p className="edit-project-subtitle">
        Update your project details and keep collaborators informed
      </p>

      <form onSubmit={handleSubmit}>

        <label >Project Title</label>

        <input type="text"
        className="edit-input"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
         />

         <label>Project Description</label>

         <input type="text" 
         className="edit-textarea"
         value={description}
         onChange={(e)=> setDescription(e.target.value)}
          />

          <label>Required Skills</label>

          <input type="text" 
          className="edit-input"
          value={requiredSkills}
          onChange={(e)=> setRequiredSkills(e.target.value)}
          />

          <button 
          className="update-btn"
          type="submit">
            Update Project
          </button>

      </form>
    </div>
    </div>
  )
}

export default EditProject
