import { Link } from "react-router-dom";
import Container from "../Shared/Container";

// import bannerImg from "../../assets/images/banner.jpg"
const Banner = () => {
    return(
        <div>
            <div className="min-h-screen object-cover  bg-hero-img bg-center ">
                {/* overlay */}
                <div className="bg-blend-overlay bg-black/75 h-screen top-0 left-0"></div>
                {/* text content */}
            </div>
                <Container>

                <div className="absolute top-1/4 md:top-1/3 text-white lg:w-1/2 space-y-6">
                    <h1 className="font-extrabold text-4xl lg:leading-tight lg:text-5xl bg-gradient-to-r from-violet-300 to-fuchsia-300 text-transparent bg-clip-text">Effortless Task Mastery for Your Productivity, Your Pace.</h1>
                    <Link to="/login" className="btn bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none hover:scale-105">Let's Explore</Link>
                </div>
                </Container>
        </div>
    )}
export default Banner;