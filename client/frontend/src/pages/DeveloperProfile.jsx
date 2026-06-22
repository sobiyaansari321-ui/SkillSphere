import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'
import { MdAttachEmail } from "react-icons/md";
// import { FaLaptopCode } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import './DeveloperProfile.css'

const DeveloperProfile = () => {

    const { id } = useParams()
    const [ developer , setDeveloper ] = useState(null)

    useEffect(()=>{
        const fetchDeveloper = async () => {
            try{
                const response = await api.get(`/users/${id}`)
                setDeveloper(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchDeveloper();
    } , [])

    if (!developer) {
        return <h2>Loading...</h2>
    }

  return (


    <div className='profile-page'>

    <div className='profile-card'>

        <div className="profile-avatar">
            {developer.name?.split(" ").map(word => word[0]).join("").toUpperCase()}        
        </div>

      <h1 className='profile-name'>
        {developer.name}
      </h1>

      <p className='profile-bio'>
        {developer.bio || "No bio added yet."}
     </p>

     <div className="profile-info">
      <p>
        <MdAttachEmail /> Email : {developer.email}
      </p>
     </div>

    <h3 className='skills-title'>
        Skills
    </h3>
    
     <div className="profile-skills">
      {developer.skills?.map( (skill,index) => (
        <span key={index} className='skill-badge'>
            {skill}
        </span>
      ))}
     </div>

     <div className="profile-links">

      <a
      href={developer.github}
      target='_blank'
      rel='noreferrer'
      className='profile-btn'
      >
        <IoLogoGithub /> GitHub : {developer.github}
      </a>

      <a
      href={developer.linkedin}
      target='_blank'
      rel='noreferrer'
      className='profile-btn'
      >
        <FaLinkedin /> LinkedIn : {developer.linkedin}
      </a>

     </div>
 
    </div>

    </div>
  )
}

export default DeveloperProfile
