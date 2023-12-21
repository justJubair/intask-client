import { Link } from "react-router-dom";
import Container from "../../components/Shared/Container";
import AddTask from "../../components/AddTask/AddTask";

const Dashboard = () => {
  return (
    <div>
      <Container>
        <Link
          to="/"
          className="btn mt-4 text-lg rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none"
        >
          inTask
        </Link>

        {/* Add a task */}
        <AddTask />

        {/* Task management table */}
      </Container>
    </div>
  );
};

export default Dashboard;
