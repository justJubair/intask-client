import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";

import "./styles.css";
import "swiper/css";
import "swiper/css/effect-cards";
const OurUsers = () => {
    return(
        <div className="h-screen" id="ourUsers">
           
            <h1 className="text-center text-violet-600 font-bold text-3xl mt-16 border-b-2 pb-2 w-1/5 mx-auto">Our Users</h1>
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

            <SwiperSlide>Hello</SwiperSlide>
            <SwiperSlide>Hello</SwiperSlide>
            <SwiperSlide>Hello</SwiperSlide>
            <SwiperSlide>Hello</SwiperSlide>
        </Swiper>
        </div>
    )}
export default OurUsers;