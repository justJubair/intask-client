import { Link } from "react-router-dom";
import SocialLogin from "../../components/Shared/SocialLogin";

const Login = () => {
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
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
