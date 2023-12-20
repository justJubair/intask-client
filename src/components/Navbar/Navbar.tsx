import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li className="duration-100 hover:border-b border-violet-600">
        <NavLink
          to="/"
          className={({ isActive, }) =>
           isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-md" : "px-3 py-1"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="duration-100 hover:border-b border-violet-600">
        <NavLink to="/dashboard"
         className={({ isActive, }) =>
         isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-md" : "px-3 py-1"
        }
        >Dashboard</NavLink>
      </li>
      <li className="duration-100 hover:border-b border-violet-600">
        <NavLink to="/ourUsers"
         className={({ isActive, }) =>
         isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-md" : "px-3 py-1"
        }
        >Our Users</NavLink>
      </li>
      <li className="duration-100 hover:border-b border-violet-600">
        <NavLink to="/about"
         className={({ isActive, }) =>
         isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-md" : "px-3 py-1"
        }
        >About</NavLink>
      </li>
    </>
  );
  return (
    <div className="absolute navbar bg-transparent">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn text-white btn-ghost lg:hidden">
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
        <Link
          to="/"
          className="hidden md:block px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
        >
          inTask
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-4 font-medium px-1 text-white">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/login"
          className="btn bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
