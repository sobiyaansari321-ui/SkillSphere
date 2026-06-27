import { useState   } from 'react'
import { Link , useNavigate } from "react-router-dom"
import api from '../services/api.js'
import './Login.css'
import { IoEyeOff } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

const Login = () => {

    const [ email , setEmail ] = useState("")
    const [ password , setPassword ] = useState("")
    const [ showPassword , setShowPassword ] = useState(false)
    const [ error , setError ] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setError("")

            const response = await api.post("/users/login",{
                email,
                password,
            })

            localStorage.setItem(
                "token",
                response.data.token
            )

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.token)
            )

            navigate("/dashboard")

            // console.log(response.data)
        }

        catch (error) {
            setError(error?.response?.data?.message || "Login Failed")
        }
    }
  return (

    <div className='login-container'>

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

        <form className='login-form'
        onSubmit={handleSubmit}>

        <h1 className='login-title'>Login</h1>

        {error && <p className='error-message'>
            {error}
            </p>}

            <input 
            className='login-input'
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />


            <div className="password-box">

            <input
            className='login-input'
            type={ showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

            <span className='show-password'
             onClick={()=>setShowPassword(!showPassword)}
             >
                {showPassword ? <IoEyeOff /> : <MdRemoveRedEye /> }
            </span>
             
            </div>
            

             <button 
             className='login-btn'
             type="submit">
                Login
             </button>

        <p className='login-text'>
            Don't have an account ?
            <Link className='signup-link' to="/signup">
                Signup
            </Link>
        </p>

        </form>
    </div>
  )
}

export default Login
