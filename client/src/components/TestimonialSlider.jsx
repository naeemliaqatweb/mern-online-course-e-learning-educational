import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Config from "../config/index";
import { Button } from "./ui/button";

const TestimonialSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const testimonials = Config.testimonials;

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper && prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [testimonials]); // Reinitialize when data changes

  return (
    <div className="max-w-4xl mx-auto relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => { // Ensure buttons are assigned correctly
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        className="p-4"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border border-[#F1F1F3] my-6 p-6 rounded-lg relative">
              <p className="text-gray-600">{testimonial.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-t-gray-200 pb-3 pt-8">
                <span className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-lg mr-3"
                  />
                  <span className="font-semibold">{testimonial.name}</span>
                </span>
                <Button className="bg-[#F7F7F8] border border-[#F1F1F3] px-4 py-2 text-md">
                  Read More
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute -bottom-10 right-4 flex space-x-2">
        <button
          ref={prevRef}
          className="p-2 w-10 h-10 bg-white cursor-pointer hover:bg-gray-200 rounded-lg flex items-center justify-center"
        >
          ⬅
        </button>
        <button
          ref={nextRef}
          className="p-2 w-10 h-10 bg-white cursor-pointer hover:bg-gray-200 rounded-lg flex items-center justify-center"
        >
          ➡
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
