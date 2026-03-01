
import { Button } from '@/components/ui/button'
import unlockImg from '/images/Home/Icon Container.png'
import CompanyLogos from '@/components/Home/CompanyLogos'
import HomeSlider from '@/components/Home/HomeSlider'
import { useNavigate } from 'react-router-dom'
import BenefitCard from '@/components/Home/BenefitCard'
import HomeCourseCard from '@/components/Home/HomeCourseCard'
import Testimonials from '@/components/Home/Testimonials'
import { useState } from "react";
import PriceCard from '@/components/Home/PriceCard'
import FaqsCard from '@/components/Home/FaqsCard'
import abstractLineIcon from '/images/Home/abstract-line.png';
const Home = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const navigate = useNavigate();
  return (
    <div className='container m-auto md:px-10 px-10 lg:px-0'>
      <div className="flex justify-center ">
        <div className='relative flex justify-center items-center gap-5 py-5 px-10 bg-white rounded-lg'>
          <img src={unlockImg} className='h-12 w-12' alt="" />
          <h1 className="text-4xl font-bold"><span className="text-orange-300">Unlock</span> Your Creative Potential</h1>
        <div className='absolute -top-6 -left-6'>
          <img src={abstractLineIcon} className='h-8 w-8 object-center' alt="" />
        </div>
        </div>
      </div>

      <div className='text-center mt-8'>
        <h1 className='text-3xl text-[#262626]'>with Online Design and Development Courses.</h1>
        <p className='text-[#262626] text-sm mt-3'>Learn from Industry Experts and Enhance Your Skills.</p>
      </div>
      <div className='flex justify-center gap-5 mt-15'>
        <Button onClick={() => navigate('/courses')} className="bg-orange-400 rounded-lg p-5 py-7 text-lg text-white font-bold cursor-pointer">Explore Courses</Button>
        <Button onClick={() => navigate('/pricing')} className="bg-white rounded-lg p-5 py-7 text-lg font-bold cursor-pointer">View Pricing</Button>
      </div>

      {/* Company Logos Comp */}
      <CompanyLogos />
      {/* Home Slider*/}
      <HomeSlider />
      <div className='my-20 '>
        <h1 className='text-3xl font-bold'>Benefits</h1>
        <div className='block md:flex  justify-between mt-3'>
          <p className='text-sm text-[#4C4C4D]'>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
          <Button className="bg-white mt-5 md:mt-0 rounded-sm cursor-pointer">View All</Button>
        </div>
        <BenefitCard />
      </div>

      <div className='my-20 '>
        <h1 className='text-3xl font-bold'>Our Courses</h1>
        <div className='block md:flex  justify-between mt-3'>
          <p className='text-sm text-[#4C4C4D]'>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
          <Button className="bg-white mt-5 md:mt-0 rounded-sm cursor-pointer">View All</Button>
        </div>
        <HomeCourseCard />
      </div>

      <div className='my-20 '>
        <h1 className='text-3xl font-bold'>Our Testimonials</h1>
        <div className='block md:flex  justify-between mt-3'>
          <p className='text-sm text-[#4C4C4D]'>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
          <Button className="bg-white mt-5 md:mt-0 rounded-sm cursor-pointer">View All</Button>
        </div>
        <Testimonials />
      </div>


      <div className='my-20 '>
        <h1 className='text-3xl font-bold'>Our Pricing</h1>
        <div className='block md:flex justify-between items-center'>
          <p className='text-sm text-[#4C4C4D]'>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
          <div className='flex items-center justify-center mt-5 md:mt-0 gap-5 bg-white  p-5 rounded-lg'>
            <Button onClick={() => setBillingCycle('monthly')} className={` ${billingCycle == 'monthly' ? 'bg-orange-400 text-white' : 'bg-white'}  mt-5 md:mt-0 rounded-sm cursor-pointer`}>Monthly</Button>
            <Button onClick={() => setBillingCycle('yearly')} className={` ${billingCycle == 'yearly' ? 'bg-orange-400 text-white' : 'bg-white'}  mt-5 md:mt-0 rounded-sm cursor-pointer`}>Yearly</Button>
          </div>
        </div>
        {/* Price Card */}
        <PriceCard billingCycle={billingCycle} />
      </div>
      {/* Faq Card */}
      <FaqsCard />

    </div>
  )
}

export default Home
