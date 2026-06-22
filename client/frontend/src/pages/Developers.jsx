import { useState , useEffect } from "react"
import api from "../services/api.js"
import {useNavigate} from 'react-router-dom'
import { FaUsersViewfinder } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import './Developers.css'

const Developers = () => {

    const [ search , setSearch ] = useState("")
    const [ developers , setDevelopers ] = useState([])
    const navigate = useNavigate()

    const handleSearch = async  () => {
        try{
            const response = await api.get(
                `/users/search?skill=${search}`
            )

            console.log("Response : ",response.data)

            setDevelopers(response.data)
        }

        catch (error) {
            console.log(error)
        }
    }

    useEffect( ()=>{
        const getDevelopers = async () => {
        try{
            const response = await api.get("/users")

            setDevelopers(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    getDevelopers()
    },[])

  return (
    <div className="developers-page">

      <h1 className="developers-title" 
      style={{display:'flex',alignItems:'center',gap:'8px'}}
      >
       <FaUsersViewfinder size={55}/> Find Developers
      </h1>

      <div className="search-box">

      <input 
      className="search-input"
      type="text"
      placeholder="Search by skill"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <button 
      className="search-btn"
      onClick={handleSearch}>
        Search
      </button>

      </div>

      <div className="developers-container">

      {developers.map( (developer) => (

          <div key={developer._id} className="developers-card">

            <h2 className="developers-name">{developer.name}</h2>

            <p className="developers-email">Email : {developer.email}</p>

            <div className="skills-container">

                {Array.isArray(developer.skills) ? (
                    developer.skills.map( (skill,index) => (

                        <span
                        key={index}
                        className="skill-badge"
                        >
                        {skill}
                    </span>
                    ))
                ): (
                    developer.skills?.split(",").map( (skill,index) => (
                        <span
                        key={index}
                        className="skill-badge"
                        >
                        {skill.trim()}
                    </span>
                    ))
                )}

            </div>

            <button 
            style={{display:'flex',alignItems:'center',gap:'8px'}}
            className="view-profile-btn"
            onClick={() => navigate(`/developer/${developer._id}`)}
            >
               <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <ImProfile size={24}/> View Profile
               </div>
            </button>

        </div>
      ))}
      </div>
    </div>
  )
}

export default Developers
