import { createContext } from "react";

interface AuthInfo {
    name: string
}

export const AuthContext = createContext<AuthInfo | null>(null)
const AuthProvider = ({children}: {children:React.ReactNode}) => {

    
    const authInfo:AuthInfo = {
        name: "joey"
    }
    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )}
export default AuthProvider;