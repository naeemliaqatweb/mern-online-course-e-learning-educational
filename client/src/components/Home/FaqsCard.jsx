import Config from "@/config";
import { Button } from "../ui/button";
import { useState } from "react";
import plusIcon from "/images/Home/plus-icon.png";
import crossIcon from "/images/Home/cross-icon.png";
import leftIcon from "/images/Home/left-icon.png";



const FaqsCard = () => {
  const faqsCard = Config.faqsCard;
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5 mb-30 p-10 bg-white'>
      <div className="mt-6">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="py-4">Still you have any questions? Contact our Team via support@skillbridge.com</p>
        <Button className="border border-[#F1F1F3] p-6 text-md font-bold mt-5">See All FAQ's</Button>
      </div>
      <div>
        {faqsCard.map((faq) => (
          <div key={faq.id} className="border border-[#F1F1F3] rounded-lg p-6 my-6">
            <div className={`flex justify-between items-center cursor-pointer ${openFAQ === faq.id ? "pb-5" : ""}`}
              onClick={() => toggleFAQ(faq.id)} >
              <h3 className="text-lg font-normal">{faq.title}</h3>
              <img src={openFAQ === faq.id ? crossIcon : plusIcon} className="w-9 h-9 p-2 rounded bg-[#FFF4E5]" alt={faq.title} />
            </div>
            {openFAQ === faq.id && (
              <div className="mt-3  border-t border-t-[#F1F1F3] pt-10">
                <p className="text-[#4C4C4D]">{faq.description}</p>
                <Button className="w-full bg-[#F1F1F3] py-10 px-6 flex justify-between mt-12 cursor-pointer">
                  <span className="text-lg text-left">
                    {faq.link_text}
                  </span>
                  <span className="bg-white rounded-full p-3"><img src={leftIcon} className="w-5 h-5" alt="icon" /></span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaqsCard
