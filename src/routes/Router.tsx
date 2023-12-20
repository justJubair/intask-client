import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>
    }
])


export default Router