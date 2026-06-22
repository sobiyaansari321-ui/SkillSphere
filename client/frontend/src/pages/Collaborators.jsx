import { useState , useEffect } from "react";
import api from "../services/api.js";
import { FaPeopleGroup } from "react-icons/fa6";
import './Collaborators.css'

const Collaborators = () => {

    const [ projects , setProjects ] = useState([])

    useEffect( ()=> {
        const fetchProjects = async () => {
            try{
                const token = localStorage.getItem("token")

                const response = await api.get(
                    "/projects/my-projects",
                    {
                        headers: {
                            Authorization : token ,
                        }
                    }
                )

                setProjects(response.data)
            }

            catch (error) {
                console.log(error)
            }
        }

        fetchProjects();
    },[])

    return (

        <div className="collaborators-page">

            <h1 className="collaborators-title">
                     <FaPeopleGroup size={50}/> My Collaborators
            </h1>

            {projects.map( (project) => (
                <div
                key={project._id}
                className="project-collaborators-card"
                >

                    <h2 className="project-title">
                        {project.title}
                    </h2>

                    {project.collaborators.length === 0 ? (

                        <p className="no-collaborators">
                            No Collaborators Yet 
                        </p>
                    ):(
                        <div className="collaborators-container">
                            {project.collaborators.map( (user) => (
                                <div
                                key={user._id}
                                className="collaborators-card"
                                >

                                    <h3 className="collaborators-name">
                                        {user.name}
                                    </h3>

                                    <p className="collaborators-email">
                                        {user.email}
                                    </p>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Collaborators;