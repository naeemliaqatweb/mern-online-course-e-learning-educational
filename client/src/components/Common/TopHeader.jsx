import React from 'react'
import icon from "/arrow-Icon.svg"
const TopHeader = () => {
  return (
    <div className='bg-orange-400 py-4 rounded-md mx-5 lg:mx-20 sm:mx-15 mt-5'>
        <div className='flex items-center justify-center text-white'>
        Free Courses 🌟 Sale Ends Soon, Get It Now
        <img src={icon} width={20} height={20} alt="icon" className='ms-7' /> 
        </div>
    </div>
  )
}

export default TopHeader
