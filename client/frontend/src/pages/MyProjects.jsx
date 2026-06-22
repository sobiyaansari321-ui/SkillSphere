import { useState , useEffect } from "react"
import api from "../services/api.js"
import { Link } from "react-router-dom"
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GiFiles } from "react-icons/gi";
import './MyProjects.css'

const MyProjects = () => {

    const [ projects , setProjects ] = useState([])

    useEffect( () => {
        const fetchMyProjects = async () => {

            try{
                const token = localStorage.getItem("token")

                const response = await api.get(
                    "/projects/my-projects",
                    {
                        headers: {
                            Authorization : token ,
                        }
                    })

                console.log(response.data)
                setProjects(response.data)

            }

            catch (error) {
                console.log(error)
            }
        }

            fetchMyProjects();
    },[])

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project ?"
        )

        if (!confirmDelete) {
            return ;
        }

        try {
            const token = localStorage.getItem("token")

            const response = await api.delete(
                `/projects/${id}`,
                {
                    headers : {
                        Authorization :token
                    },
                }
            );

            console.log(response.data)
            alert("Project Deleted")

            setProjects(
                projects.filter(
                    (project) => project._id !== id
                )
            )
        }

        catch (error) {
            console.log(error)
        }

    }

  return (
    <div className="myprojects-container">

      <h1 className="myprojects-title" >
        <GiFiles size={55}/> My Projects</h1>

      {projects.map( (project) => (
        <div key={project._id} className="project-card">

            <h2 className="project-title">
                {project.title}
            </h2>

            <div className="project-actions">

            <Link to={`/edit-project/${project._id}`}>
            <button className="edit-btn">
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <MdModeEdit size={18}/> Edit
                </div>
            </button>
            </Link>

            <button className="dlt-btn"
            onClick={()=> handleDelete(project._id)}>
               <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <MdDelete size={18} /> Delete
               </div>
            </button>

            </div>

            <p className="project-description">
                {project.description}
            </p>

            <p className="project-skills">
                Skills : {project.requiredSkills?.join(", ")}
            </p>

        </div>
      ))}
    </div>
  )
}

export default MyProjects
