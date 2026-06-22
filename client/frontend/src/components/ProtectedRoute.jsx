import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    // local storage me jo token saved h unhe nikalegi
    // agr token null h to login page pe redirect krdega 
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute