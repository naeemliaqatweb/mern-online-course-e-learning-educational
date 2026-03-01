import FaqsCard from '@/components/Home/FaqsCard'
import PriceCard from '@/components/Home/PriceCard'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  return (
    <div className='container m-auto my-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-b-[#F1F1F3] pb-10 place-items-start items-center'>
        <h1 className='text-6xl font-bold'>Our Pricings</h1>
        <p className='text-lg text-[#4C4C4D]'>
          Welcome to SkillBridge's Pricing Plan page, where we offer two comprehensive options to cater to your needs: Free and Pro. We believe in providing flexible and affordable pricing options for our services. Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you.
          Explore our pricing options below and choose the one that best fits your requirements.s
        </p>
      </div>
      <div className='mt-10 flex justify-center'>
        <div className='flex items-center justify-center mt-5 md:mt-0 gap-5 bg-white w-60  p-5 rounded-lg'>
          <Button onClick={() => setBillingCycle('monthly')} className={` ${billingCycle == 'monthly' ? 'bg-orange-400 text-white' : 'bg-white'}  mt-5 md:mt-0 rounded-sm cursor-pointer`}>Monthly</Button>
          <Button onClick={() => setBillingCycle('yearly')} className={` ${billingCycle == 'yearly' ? 'bg-orange-400 text-white' : 'bg-white'}  mt-5 md:mt-0 rounded-sm cursor-pointer`}>Yearly</Button>
        </div>
      </div>
      <PriceCard billingCycle={billingCycle} />
      <div className='mt-20 mb-10'>
        <FaqsCard />
      </div>
    </div>
  )
}

export default Pricing
