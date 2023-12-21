import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"

const useAuth = ()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all:any = useContext(AuthContext)
    return all
}

export default useAuth