import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader";

const PrivateRoute = ({children}: {children:React.ReactNode}) => {
        const {loading, user} = useAuth()

        if(loading){
            return <Loader/>
        }
        if(!user){
            return <Navigate to="/login"/>
        } return children
    
    }
export default PrivateRoute;