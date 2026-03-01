import AchievementsCard from '@/components/AchievementsCard';
import Config from '../../src/config/index';
import OurGoalsCard from '@/components/OurGoalsCard';
import { Button } from '@/components/ui/button';

const About = () => {
  const achievements = Config.achievements;
  const ourGoals = Config.ourGoals;
  return (
    <div className='container m-auto my-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-b-[#F1F1F3] pb-10 place-items-start items-center mx-3 md:mx-5'>
        <h1 className='text-6xl font-bold'>About Skillbridge</h1>
        <p className='text-lg text-[#4C4C4D]'>
        Welcome to our platform, where we are passionate about empowering individuals to master the world of design and development. We offer a wide range of online courses designed to equip learners with the skills and knowledge needed to succeed in the ever-evolving digital landscape.</p>
      </div>
      <hr className='py-8 text-[#F1F1F3]' />

      <div className='mt-10 mb-20 mx-5'>
        <h1 className='text-3xl font-bold'>Achievements</h1>
        <div className='mt-3'>
          <p className='text-sm text-[#4C4C4D]'>Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements</p>
        </div>
        <AchievementsCard achievements={achievements} />
      </div>

      <div className='my-20 mx-5'>
        <h1 className='text-3xl font-bold'>Our Goals</h1>
        <div className='mt-3'>
          <p className='text-sm text-[#4C4C4D]'>At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact.
          Through our carefully crafted courses, we aim to</p>
        </div>
        <OurGoalsCard ourGoals={ourGoals} />
      </div>

      <div className='bg-white rounded-lg border border-[#F1F1F3] p-20 mx-5'>
        <p className='text-[#4C4C4D]'>Join us on this exciting learning journey and unlock your potential in design and development.</p>
        <div className='block md:flex justify-between mt-10'>
          <h1 className='text-3xl font-bold'><span className='text-orange-400'>Together</span>, let's shape the future of digital innovation</h1>
          <Button className="text-white bg-orange-400 p-4 mt-5 md:mt-0">Join Now</Button>
        </div>
      </div>

    </div> 
  )
}

export default About
