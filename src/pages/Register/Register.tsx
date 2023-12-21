import { Link } from "react-router-dom";
import SocialLogin from "../../components/Shared/SocialLogin";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const {createUser} = useAuth()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRegister = (e: { preventDefault: () => void; target: any; })=>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
    
        .then((result: { user: object; })=>{
            if(result?.user){
              toast.success("User created")
            }
        })
        .catch((error: { message: Renderable | ValueFunction<Renderable, Toast>; })=>{
          toast.error(error.message)
        })
        
    }
  return (
    <>
      <Link
        to="/"
        className="absolute px-4 py-1 top-5 left-12 text-lg rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
      >
        inTask
      </Link>
      <div className="py-10 flex justify-center items-center min-h-screen bg-base-200">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-center pb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600  text-transparent bg-clip-text">
            Register now!
          </h1>

          <div className=" max-w-md rounded-lg w-full shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https//:your.photo.png"
                  name="photo"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
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
                  name="password"
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
              <p className="font-bold text-violet-700">Already have an account?</p>
              <Link to="/login" className="btn btn-link text-base">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
