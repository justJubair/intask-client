import { Link } from "react-router-dom"


const Dashboard = () => {
  return (
    <div>
      <Link to="/"  className="absolute top-4 left-4 px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">inTask</Link>
      <h1>dashboard</h1>
    </div>
  )
}

export default Dashboard
