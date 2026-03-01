import compLogo1 from "/images/Home/comp-logo-1.png"
import compLogo2 from "/images/Home/comp-logo-2.png"
import compLogo3 from "/images/Home/comp-logo-3.png"
import compLogo4 from "/images/Home/comp-logo-4.png"
import compLogo5 from "/images/Home/comp-logo-5.png"
import compLogo6 from "/images/Home/comp-logo-6.png"
import compLogo7 from "/images/Home/comp-logo-7.png"

const CompanyLogos = () => {
    const CompLogos = [compLogo1, compLogo2 , compLogo3 , compLogo4 , compLogo5 , compLogo6 , compLogo7];
  return (

<div className="bg-white  mt-15 rounded-lg">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-10 py-8 px-15 md:px-5 place-items-center">
    {
      CompLogos.length > 0 ? CompLogos.map((logo, index) => (
        <img 
          key={index}
          className="h-auto w-auto max-w-[100px] py-4 md:py-0 object-contain border-b md:border-b-0 md:border-r border-b-gray-200 md:border-r-gray-300 pr-8 last:border-0"
          src={logo} 
          alt="Company Logo"
        />
      )) : null
    }
  </div>
</div>


  )
}

export default CompanyLogos
