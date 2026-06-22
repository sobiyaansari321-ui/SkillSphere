import { useState } from "react"
import api from "../services/api.js"
import './CreateProject.css'
import { IoRocketSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {

    const [ title , setTitle ] = useState("")
    const [ description , setDescription ] = useState("")
    const [ requiredSkills , setRequiredSkills ] = useState("")
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await api.post("/projects",
                {
                    title,
                    description,
                    requiredSkills: requiredSkills.split(",")
                },
                {
                    headers:{
                        Authorization : token ,
                    }
                }
            )

            alert("Project Created Successfully !")

            navigate("/my-projects")

            console.log(response.data)

        }

        catch (error) {
            console.log(error)
        }

        console.log(
            title,
            description,
            requiredSkills,
        )
    }

    return (

    <div className="create-project-container">

        <div className="create-project-card">

            <h1 className="create-project-title">
                <IoRocketSharp /> Launch Your Project
            </h1>

            <p className="create-project-subtitle">
                Create a project and connect with talented developers !
            </p>

            <form 
            className="create-project-form"
            onSubmit={handleSubmit}>

                <label className="project-label">
                    Project Title
                </label>

                <input type="text"
                className="project-input"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                 />

                 
                <label className="project-label">
                    Project Description
                </label>
                 
                 <textarea type="text"
                 className="project-textarea"
                 placeholder="Description..."
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 />

                 
                <label className="project-label">
                    Required Skills
                </label>

                 <input type="text"
                 className="project-input"
                 placeholder="Skills... (comma seperated)"
                 value={requiredSkills}
                 onChange={(e) =>  setRequiredSkills(e.target.value)}
                 />

                 <button 
                 className="create-project-btn"
                 type="submit">
                    Create Project
                 </button>

            </form>
        </div>
     </div>
    )
}

export default CreateProject