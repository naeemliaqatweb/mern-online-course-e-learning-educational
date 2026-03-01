import Config from '../../config/index';
import { Button } from '../ui/button';
import benefitIcon from '/images/Home/benefit-vector-icon.svg';
const BenefitCard = () => {
  const benefitCard = Config.benefitCard;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5'>
       {
        benefitCard.length > 0 ? benefitCard.map((item , index) => 
            
            <div className='bg-white rounded-lg p-10' key={index}>
               
            <h1 className='text-5xl font-bold text-right'>{String(index + 1).padStart(2, '0')}</h1>
            <h2 className='text-lg font-bold mt-3'>{item.title}</h2>
            <p className='text-sm text-gray-400 mt-2'>{item.description}</p>
            <Button className="bg-[#F1F1F3] border border-gray-300 rounded-lg mt-5 p-5 float-right cursor-pointer">
                <img src={benefitIcon} className='h-3 w-3' alt="" />
            </Button>
           </div>
        ) : null
       }
    </div>
  )
}

export default BenefitCard

