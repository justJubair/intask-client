import { FaGithub, FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
    return(
        <div className="flex justify-center items-center gap-4 mb-6">
            <button className="btn flex items-center ">
                <h3 className="font-medium text-lg">Login with</h3>
                <FaGoogle size={20}/>
            </button>
            <button className="btn flex items-center">
                <h3 className="font-medium text-lg">Login with</h3>
                <FaGithub size={23}/>
            </button>
        </div>
    )}
export default SocialLogin;