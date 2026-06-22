import { useState , useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import api from "../services/api.js";
import { FaUserEdit } from "react-icons/fa";
import './EditProfile.css'

const EditProfile = () => {

    const [ bio , setBio ] = useState("")
    const [ skills , setskills ] = useState([])
    const [ github , setGithub ] = useState("")
    const [ linkedin , setLinkedin ] = useState("")
    const navigate = useNavigate()

    useEffect( ()=> {
        const fetchProfile = async () => {
            try{
                const token = localStorage.getItem("token")
                const response = await api.get("/users/profile",
                    {
                        headers : {
                            Authorization : token,
                        }
                    }
                );

                const user = response.data.user;

                setBio(user.bio || "");
                setskills(user.skills?.join(", ") || "");
                setGithub(user.github || "");
                setLinkedin(user.linkedin || "");
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchProfile()
    },[])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            const response = await api.put(
                "/users/profile",
                {
                    bio,
                    skills : skills.split(","),
                    github,
                    linkedin,
                },
                {
                    headers : {
                        Authorization : token ,
                    },
                }
            );

            console.log(response.data)
            alert("Profile Updated Successfully !")
            navigate("/dashboard")
        }

        catch (error) {
            console.log(error)
        }
    }

  return (

    <div className="edit-profile-container">

    <div className="edit-profile-card">

      <h1 className="edit-profile-title">
        <FaUserEdit size={55}/> Edit Profile
      </h1>

      <p className="edit-profile-subtitle">
        Update your profile and showcase your skills to collaborators
      </p>

      <form onSubmit={handleUpdate}>

        <label>Bio</label>

      <input 
      type="text"
      className="edit-input" 
      placeholder="Bio..."
      value={bio}
      onChange={(e)=> setBio(e.target.value)}
      />

      <label>Your Skills</label>

      <input 
      type="text" 
      className="edit-input"
      placeholder="Skills.."
      value={skills}
      onChange={(e)=> setskills(e.target.value)}
      />

      <label>GitHub</label>

      <input 
      type="text" 
      className="edit-input"
      placeholder="GitHub..."
      value={github}
      onChange={(e)=> setGithub(e.target.value)}
      />

      <label>LinkedIn</label>

      <input 
      type="text" 
      className="edit-input"
      placeholder="LinkedIn..."
      value={linkedin}
      onChange={(e)=> setLinkedin(e.target.value)}
      />

      <button type="submit" className="update-btn">
        Update Profile
      </button>
      </form>
    </div>

    </div>
  )
}

export default EditProfile
