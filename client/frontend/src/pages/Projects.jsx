import { useState , useEffect } from "react"
import { Link } from 'react-router-dom'
import api from "../services/api.js"
import './Projects.css'

const Projects = () => {
    const [ projects , setProjects ] = useState([])
    const [ search , setSearch ] = useState("")
    // const [ currentUser , setCurrentUser ] = useState(null)

    useEffect( ()=> {
        const fetchProjects = async () => {
            try{
                const response = await api.get("/projects")
                setProjects(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        // const fetchCurrentUser = async () => {
        //     try{
        //         const token = localStorage.getItem("token")
        //         const response = await api.get("/users/profile",
        //             {
        //                 headers : {
        //                     Authorization : token,
        //                 }
        //             }
        //         );
        //         setCurrentUser(response.data)
        //         console.log(currentUser)
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // }

        fetchProjects()
        // fetchCurrentUser()

    },[])

    const handleSearch = async () => {
        try{
            const response = await api.get(
                `/projects/search?skill=${search}`
            )

            setProjects(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleRequest = async (projectId) => {
        try {
            const token = localStorage.getItem("token")

            const response = await api.post(
                `/requests/send/${projectId}`,
                {},
                {
                headers : {
                    Authorization : token
                }
            })

            console.log(response.data)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }


  return (
    <div className="projects-container">
        
         <h1 className="projects-title">Explore Projects</h1>

         <div className="search-box">

         <input className="search-input"
         type="text"
         placeholder="Search by skill"
         value={search}
         onChange={(e) => setSearch(e.target.value) }
         />

         <button className="search-btn" onClick={handleSearch}>
            Search
         </button>

         </div>

         {projects.map((project) => (
             <div className="project-card" key={project._id}>

                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <p className="project-skills">Skills : {project.requiredSkills?.join(", ")}</p>

                <div className="project-actions">

                <Link to={`/projects/${project._id}`}>
                <button className="details-btn">
                    View Details
                </button>
                </Link>

                <button className="request-btn" onClick={()=>handleRequest(project._id)}>
                    Send Request
                </button>

                </div>

            </div>
         ))}
    </div>
  )
}

export default Projects
