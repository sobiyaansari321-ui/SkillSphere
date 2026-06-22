import { useState , useEffect } from "react"
import api from "../services/api.js"
import './MyRequests.css'
import { TiTick } from "react-icons/ti";
import { BsFileExcelFill } from "react-icons/bs";
import { TbFileSignalFilled } from "react-icons/tb";

const MyRequests = () => {

    const [ requests , setRequests ] = useState([])

    useEffect( ()=> {
        const fetchRequests = async () => {

            try{
                const token = localStorage.getItem("token")

                const response = await api.get(
                    "/requests/my-requests",
                    {
                        headers:{
                            Authorization: token
                        }
                    }
                );

                console.log(response.data)
                setRequests(response.data)
            }

            catch (error) {
                console.log(error)
            }
        }
        fetchRequests()
    },[])

    const handleAccept = async (id) => {

        try{
            const token = localStorage.getItem("token")

            const response = await api.put(
                `/requests/${id}/accept`,
                {},
                {
                    headers:{
                        Authorization : token,
                    }
                }
            )

            console.log(response)

            alert("Request Accepted !")
        }

        catch (error) {
            console.log(error)
        }
    }

    const handleReject = async (id) => {

        try{
            const token = localStorage.getItem("token")

            const response = await api.put(
                `/requests/${id}/reject`,
                {},
                {
                    headers:{
                        Authorization : token,
                    }
                }
            )

            console.log(response)

            alert("Request Rejected !")
        }

        catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <h1 className="my-request-title">
       <TbFileSignalFilled /> My Requests
      </h1>

      <div className="request-container">

      {requests.map( (request)=>(
          
          <div key={request._id} className="request-card">

            <h3>{request.projectId.title}</h3>

            <p>
                Requested by : {" "} 
                {request.senderId.name}
            </p>

            <p>
                Status : 
                <span className={
                    request.status === "Accepted" ? "accepted-status" : request.status === "Rejected" ? "rejected-status" : "pending-status"
                }
                >
                 {" "} {request.status}
                </span>
            </p>

            {request.status === "Pending" && (
                <div className="request-actions">

                <button className="accept-btn"
                onClick={()=>handleAccept(request._id)}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        Accept <TiTick size={23}/>
                    </div>
                </button>

                <button className="reject-btn"
                onClick={()=>handleReject(request._id)}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        Reject <BsFileExcelFill size={20}/>
                    </div>
                </button>
                </div>
            )}
        </div>
      ))}
      </div>
    </div>
  )
}

export default MyRequests
