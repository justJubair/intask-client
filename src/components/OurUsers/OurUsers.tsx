import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import "./styles.css";
import "swiper/css";
import "swiper/css/effect-cards";
import Container from "../Shared/Container";
import { useEffect, useState } from "react";



const OurUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch("https://worktales-server.vercel.app/api/v1/testimonials")
        .then(res=> res.json())
        .then(data=> setUsers(data))
    },[])

  return (
    <div className="my-20" id="ourUsers">
        <Container>

      {/* main container */}
      <div className="flex flex-col items-center justify-center md:gap-10 md:flex-row">
        <div className="w-full md:w-1/2">
          <BiSolidQuoteAltLeft size={50} />
          <h1 className="text-3xl leading-tight w-full font-extrabold text-violet-600 lg:text-5xl">
            Check what our users have to say about us.
          </h1>
          <span className="flex justify-end w-full lg:w-11/12 mt-1">
            <BiSolidQuoteAltRight size={50} />
          </span>
        </div>
       <div className="w-full md:w-52">
       <Swiper
          effect={"cards"}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[EffectCards, Autoplay]}
          className="mySwiper"
        >
         
           {users?.map((testimonial:{_id: string, img_url:string, name:string, role:string, company_name:string, testimonial:string}) => (
            <SwiperSlide key={testimonial._id}>
              <div className="flex flex-col items-center justify-center">
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src={testimonial.img_url}
                  alt=""
                />
                <h3 className="text-black font-bold">{testimonial.name}</h3>
                <div className="text-center">
                  <p className="text-xs text-gray-500">{testimonial?.role}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial?.company_name}
                  </p>
                </div>
                <p className="text-center text-xs text-gray-600 p-4">
                  {testimonial?.testimonial}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
       </div>
      </div>
        </Container>
    </div>
  );
};
export default OurUsers;
