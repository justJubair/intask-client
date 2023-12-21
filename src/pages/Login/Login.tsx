/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";

const Login = () => {
  const {loginUser} = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e: { preventDefault: () => void; target: any })=>{
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    loginUser(email, password)
    .then(()=>{
      toast.success("Logged in")
      navigate("/dashboard")
    })
    .catch(
      (error: { message: Renderable | ValueFunction<Renderable, Toast> }) => {
        toast.error(error.message);
      }
    );
    
    
  }

  return (
    <>
      <Link
        to="/"
        className="absolute px-4 py-1 top-5 left-12 text-lg rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
      >
        inTask
      </Link>
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-center pb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600  text-transparent bg-clip-text">
            Login now!
          </h1>

          <div className=" max-w-md rounded-lg w-full shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
                  Login
                </button>
              </div>
            </form>
            {/* social login */}
            <SocialLogin/>
            {/* new to in task */}
            <div className="flex items-center justify-between px-6 mb-4">
              <p className="font-bold text-violet-700">New to inTask?</p>
              <Link to="/register" className="btn btn-link text-base">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
