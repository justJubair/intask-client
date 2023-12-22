import { NavLink } from "react-router-dom";
import Container from "../Shared/Container";
import { Link } from 'react-scroll';
import useAuth from "../../hooks/useAuth";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
const Navbar = () => {
  const {user,logOut} = useAuth()

  const handleLogout =()=>{
    logOut()
    .then()
    .catch(
      (error: { message: Renderable | ValueFunction<Renderable, Toast> }) => {
        toast.error(error.message);
      }
    );
  }
  const navLinks = (
    <>
      <li className="duration-100 hover:border-b border-violet-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-md"
              : "px-3 py-1"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="duration-100 hover:border-b border-violet-600">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-md"
              : "px-3 py-1"
          }
        >
          Dashboard
        </NavLink>
      </li>
     
      <Link
        to="ourUsers"
        spy={true} 
        smooth={true} 
        offset={-30} 
        duration={500} 
        >
           <li className="duration-100 hover:border-b border-violet-600 cursor-pointer px-3">Our Users</li>
          
        </Link>
     
      
        <Link
        to="about"
        spy={true} 
        smooth={true} 
        offset={50} 
        duration={500} 
        >
           <li className="duration-100 hover:border-b border-violet-600 cursor-pointer px-3">About</li>
          
        </Link>
      
    </>
  );
  return (
    <div className="absolute  bg-transparent w-full">
      <Container>
        <div className="navbar mt-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn text-white btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navLinks}
              </ul>
            </div>
            <button
              
              className="hidden md:block px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
            >
              inTask
            </button>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex space-x-4 font-medium px-1 text-white">
              {navLinks}
            </ul>
          </div>
          <div className="navbar-end">
            {
              user ? <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User" src={user?.photoURL} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                
                <li><a>{user?.displayName}</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div> :  <NavLink
              to="/login"
              className="btn bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
            >
              Login
            </NavLink>
            }
           
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
