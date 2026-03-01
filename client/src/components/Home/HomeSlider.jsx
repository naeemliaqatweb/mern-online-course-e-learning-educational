import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slider1 from "/images/HomeSlider/Slider1.png"
import Slider2 from "/images/HomeSlider/Slider2.png"
import Slider3 from "/images/HomeSlider/Slider3.png"

const HomeSlider = () => {
  const slides = [
    { type: "image", src: Slider1 },
    { type: "image", src: Slider2 },
    { type: "image", src: Slider3 },
  ];

  return (
    <div className="w-full my-10">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[550px]" // Fixed height for slider
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {slide.type === "video" ? (
              <video
                className="w-full h-[550px] object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[550px] object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
