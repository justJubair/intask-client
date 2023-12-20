import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import About from "../pages/About/About";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/about",
                element: <About/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    }
])


export default Router