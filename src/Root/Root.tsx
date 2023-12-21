import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
const Root = () => {
  return (
    <div>
      {/* <DndProvider backend={HTML5Backend}> */}
        <Navbar />
        <Outlet />
      {/* </DndProvider> */}
    </div>
  );
};
export default Root;
