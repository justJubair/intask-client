import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}: {children:React.ReactNode}) => {
        const {loading, user} = useAuth()

        if(loading){
            return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-secondary"></span></div>
        }
        if(!user){
            return <Navigate to="/login"/>
        } return children
    
    }
export default PrivateRoute;