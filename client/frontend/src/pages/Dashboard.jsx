import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import api from "../services/api.js";
import { Link } from "react-router-dom";
import "./Dashboard.css"
import { PiHandWavingBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { HiOutlineLink } from "react-icons/hi2";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { LuFileStack } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { TbFileSignalFilled } from "react-icons/tb";
import { FcSearch } from "react-icons/fc";
import { HiDocumentPlus } from "react-icons/hi2";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { TiMessageTyping } from "react-icons/ti";
import { TbFileSmileFilled } from "react-icons/tb";
import { VscEditSparkle } from "react-icons/vsc";
import { MdPersonSearch } from "react-icons/md";

const Dashboard = () => {

  const navigate = useNavigate();

  const [ user , setUser ] = useState(null);
  const [ myProjects , setMyProjects ] = useState([])
  const [ myRequests , setMyRequests ] = useState([])

  useEffect( () => {
    const fetchProfile = async () => {

      try{
        const token = localStorage.getItem("token")
        const response = await api.get("/users/profile",
          {
            headers:{
              Authorization:token,
            },
          });

        console.log(response.data)
        setUser(response.data.user);
      }

      catch (error) {
        console.log(error)
      }
    }

    const fetchMyProjects = async () => {
      
      try{
        const token = localStorage.getItem("token")

        const response = await api.get(
          "projects/my-projects",{
            headers : {
              Authorization :token
            },
          }
        )
        
        setMyProjects(response.data)
        
      }
      catch (error) {
        console.log(error)
      }
    }
    
    
    const fetchMyRequests = async () => {
      try{
        const token = localStorage.getItem("token")
        
        const response = await api.get(
          "/requests/my-requests",{
            headers : {
              Authorization : token ,
            },
          }
        );
        
        setMyRequests(response.data)
      }
      
      catch (error) {
        console.log(error)
      }
    }
    
    fetchProfile();
    fetchMyProjects();
    fetchMyRequests();

  },[])

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/")
  }

  return (
    <div className="dashboard">
      
      <div className="profile-card">
        <div className="avatar">
          {user?.name?.split(" ").map(word => word[0]).join("").toUpperCase()}
        </div>
      <h2><PiHandWavingBold size={25}/> Welcome {user?.name}</h2>

      <p className="bio"> {user?.bio}</p>

      <div className="info">
      <p><MdEmail /> Email : {user?.email}</p>
      <p><MdOutlineLaptopChromebook  /> Skills : {user?.skills}</p>
      <p><HiOutlineLink size={22} /> GitHub : {user?.github}</p>
      <p><HiOutlineLink size={22} /> LinkedIn : {user?.linkedin}</p>

      </div>
      </div>

      <div className="stats">

        <div className="stat-card" onClick={()=>navigate("/my-projects")}>
          <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <LuFileStack size={30}/> Projects
          </h3>
          <h1>{myProjects.length}</h1>
        </div>

        <div className="stat-card" onClick={()=>navigate("/my-requests")}>
          <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <TbFileSignalFilled size={35} /> Requests
          </h3>
          <h1>{myRequests.length}</h1>
        </div>

        <div className="stat-card" onClick={()=>navigate("/collaborators")}>
          <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <IoIosPeople size={35} /> Collaborators
          </h3>
          <h1>{myProjects.reduce(
            (total,project) => 
              total + (project.collaborators?.length || 0) ,
            0
          )}</h1>
        </div>

      </div>


      <div className="actions">

      <Link to="/developers">
      <button className="developer-btn">
      <div className="developer-search-section "
      style={{display:'flex',alignItems:'center', justifyContent:'center',gap:'8px'}}>
        <MdPersonSearch size={28}/> Find Developers
      </div>
      </button>
      </Link>

        <Link to="/projects">
      <button>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <FcSearch size={30}/> Explore Projects
      </div>
      </button>
      </Link>

      <Link to='/create-project'>
      <button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <HiDocumentPlus size={27}/> Create Project
      </div>
      </button>
      </Link>

      <Link to='/my-projects'>
      <button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <TbFileSmileFilled size={27}/> My Projects
      </div>
      </button>
      </Link>

      <Link to='/my-requests'>
      <button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <TiMessageTyping size={28}/> My Requests
      </div>
      </button>
      </Link>

      <Link to='/edit-profile'>
      <button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <VscEditSparkle size={27}/> Edit Profile
      </div>
      </button>
      </Link>
      
      <button onClick={handleLogout} id="logout-btn">
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
        <RiLogoutCircleRFill size={27}/> LogOut
      </div>
      </button>
      </div>
      
    </div>
  )
}

export default Dashboard
