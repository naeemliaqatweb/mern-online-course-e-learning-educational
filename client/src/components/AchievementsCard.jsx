import React from 'react'

const AchievementsCard = ({achievements}) => {
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        {
            achievements.length > 0 ? achievements.map((item, index) => 
            <div className='bg-white border border-[#F1F1F3] p-10 rounded-lg' key={index}>
                <img src={item.icon} className='h-10 w-10 bg-[#FFF9F0] p-[8px]' alt="" />
                <h3 className='text-lg font-bold my-5'>{item.title}</h3>
                <p className='text-[#59595A] '>{item.description}</p>
            </div>
            ) : null
        }
      
    </div>
  )
}

export default AchievementsCard
