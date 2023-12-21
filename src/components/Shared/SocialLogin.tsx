import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result: { user: object }) => {
        if (result?.user) {
          toast.success("Logged in");
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
      <button className="btn flex items-center">
        <h3 className="font-medium text-lg">Login with</h3>
        <FaGithub size={23} />
      </button>
    </div>
  );
};
export default SocialLogin;
