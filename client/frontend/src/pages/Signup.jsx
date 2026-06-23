import { useState } from 'react'
import { Link , useNavigate } from "react-router-dom"
import api from '../services/api.js'
import './Signup.css'
import { IoEyeOff } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

const Signup = () => {

    const [ name , setName ] = useState("")
    const [ email , setEmail ] = useState("")
    const [ password , setPassword ] = useState("")
    const [ showPassword , setShowPassword ] = useState(false)
    const [ error , setError ] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("")
            const response = await api.post("/users/signup",{
                name,email,password,
            });

            console.log(response.data)

            navigate("/")
        }

        catch (error) {
            setError(
                error?.response?.data?.message || "Signup failed"
            )
        }
    }
  return (
    <div className='signup-container'>

        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>
        <div className="bubble bubble5"></div>
        <div className="bubble bubble6"></div>
        <div className="bubble bubble7"></div>
        <div className="bubble bubble8"></div>
        <div className="bubble bubble9"></div>
        <div className="bubble bubble10"></div>

        <form className='signup-form' onSubmit={handleSubmit}>

        <h1 className='signup-title'>Signup</h1>

        {error && <p className='error-message'>
            {error}
            </p>}

            <input className='signup-input'
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
             />

             <input className='signup-input'
             type="email"
             placeholder="Enter Email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             />


             <div className="password-box">

             <input className='signup-input'
             type={showPassword ? "text" : "password"}
             placeholder="Enter Password"
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             />

             <span className='show-password'
             onClick={()=>setShowPassword(!showPassword)}
             >
                {showPassword ? <IoEyeOff /> : <MdRemoveRedEye /> }
             </span>

            </div>

             <button className='signup-btn'
            //  onClick={handleSubmit}
              type="submit">
                Signup
            </button>

        <p className='signup-text'>
            Already have an account ?
            <Link to="/" className='signup-link'>Login</Link>
        </p>

        </form>
    </div>
  )
}

export default Signup
