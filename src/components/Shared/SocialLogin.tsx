import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result: { user: object }) => {
        if (result?.user) {
          toast.success("Logged in");
          navigate("/dashboard")
        }
      })
      .catch(
        (error: { message: Renderable | ValueFunction<Renderable, Toast> }) => {
          toast.error(error.message);
        }
      );
  };
  const handleGithubLogin = () => {
    githubSignIn()
      .then((result: { user: object }) => {
        if (result?.user) {
          toast.success("Logged in");
          navigate("/dashboard")
        }
      })
      .catch(
        (error: { message: Renderable | ValueFunction<Renderable, Toast> }) => {
          toast.error(error.message);
        }
      );
  };
  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <button onClick={handleGoogleLogin} className="btn flex items-center ">
        <h3 className="font-medium text-lg">Login with</h3>
        <FaGoogle size={20} />
      </button>
      <button onClick={handleGithubLogin} className="btn flex items-center">
        <h3 className="font-medium text-lg">Login with</h3>
        <FaGithub size={23} />
      </button>
    </div>
  );
};
export default SocialLogin;
