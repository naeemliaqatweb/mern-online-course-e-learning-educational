import React from 'react'
import Config from '../../config/index'
import { Button } from '../ui/button';

const Testimonials = () => {
  const testimonials = Config.testimonials;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
      {
        testimonials.length  > 0 ? testimonials.map((item , index) => 
        <div className='bg-white  rounded-lg border border-gray-300' key={index}>
          <p className='text-[#4C4C4D] font-light p-8'>{item.description}</p>
          <div className='block md:flex justify-between mt-2 border-t border-gray-300 p-8'>
            <span className='flex gap-5 items-center'>
              <img className='h-12 w-12' src={item.image} alt="" />
              <h4>{item.name}</h4>
            </span>
            <Button className="text-[#262626] bg-[#F1F1F3] mt-8 md:mt-0 p-6 border border-gray-200">Read Full Story</Button>
          </div>
        </div>
        
        ) : null
      }
    </div>
  )
}

export default Testimonials
