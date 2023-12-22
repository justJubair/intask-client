import { Link } from "react-router-dom";
import Container from "../../components/Shared/Container";
import AddTask from "../../components/AddTask/AddTask";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import TaskTable from "../../components/TaskTable/TaskTable";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Dashboard = () => {
  const { user, logOut } = useAuth();

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user],
    queryFn: async () => await getTasks(user?.email),
  });

  const handleLogout = () => {
    logOut()
      .then()
      .catch(
        (error: { message: Renderable | ValueFunction<Renderable, Toast> }) => {
          toast.error(error.message);
        }
      );
  };
  return (
    <div>
      <Container>
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link
            to="/"
            className="btn mt-4 text-lg rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
          >
            inTask
          </Link>

          {/* user avatar */}
          <div className="dropdown dropdown-end mt-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>{user?.displayName}</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Add a task */}
        <AddTask refetch={refetch} />

        {/* Task management table */}
        <DndProvider backend={HTML5Backend}>
          <TaskTable tasks={tasks} isLoading={isLoading} refetch={refetch} />
        </DndProvider>
      </Container>
    </div>
  );
};

export default Dashboard;
