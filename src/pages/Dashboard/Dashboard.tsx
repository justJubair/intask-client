import { Link } from "react-router-dom"
import Container from "../../components/Shared/Container"


const Dashboard = () => {
  return (
    <div>
      <Container>

      <Link to="/"  className="absolute top-5 px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">inTask</Link>
      
      </Container>
    </div>
  )
}

export default Dashboard
