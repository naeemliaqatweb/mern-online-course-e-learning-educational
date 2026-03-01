import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React from 'react'

const Contact = () => {
  return (
    <div className='container m-auto my-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-b-[#F1F1F3] pb-10 place-items-start items-center md:mx-5'>
        <h1 className='text-6xl font-bold'>Contact US</h1>
        <p className='text-lg text-[#4C4C4D]'>
          Welcome to SkillBridge's Pricing Plan page, where we offer two comprehensive options to cater to your needs: Free and Pro. We believe in providing flexible and affordable pricing options for our services.
          Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you. Explore our pricing options below and choose the one that best fits your requirements.
        </p>
      </div>
      <hr className='py-8 text-[#F1F1F3]' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[65%_25%] gap-10 bg-white rounded-lg md:mx-5 place-content-center'>
        <div className='space-y-8 border-r border-r-[#F1F1F3] pr-10 p-15'>
          <div className='block lg:flex justify-between gap-10'>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">First Name</Label>
              <Input type="text" name="" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' placeholder="Enter First Name" />
            </div>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Last Name</Label>
              <Input type="text" name="" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' placeholder="Enter Last Name" />
            </div>
          </div>
          <div className='block lg:flex justify-between gap-10'>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Email</Label>
              <Input type="email" name="" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' placeholder="Enter Email" />
            </div>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Phone</Label>
              <Input type="number" name="" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' placeholder="Enter Phone Number" />
            </div>
          </div>
          <div className=''>
            <Label className="text-sm mb-2 text-[#262626]">Subject</Label>
            <Input type="text" name="" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' placeholder="Enter your Subject" />
          </div>
          <div className=''>
            <Label className="text-sm mb-2 text-[#262626] ">Message</Label>
            <Textarea name="" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' placeholder="Enter your Message here..." />
          </div>
          <div className='flex items-center justify-center mt-10'>
            <Button name="" className="cursor-pointer p-6 bg-amber-500 text-white text-md">Send Your Message</Button>
          </div>

        </div>


        <div className='py-15 px-10 space-y-6'>
          <div className="p-10 bg-[#F7F7F8] border border-[#F1F1F3] rounded-lg">
            <Mail className="h-9 w-9 text-gray-600 bg-gray-200 p-2 m-auto rounded-lg mb-3" />
            <span className="text-gray-700 text-center text-lg">naeemliaqat@gmail.com</span>
          </div>
          <div className="p-10 bg-[#F7F7F8] border-[#F1F1F3] rounded-lg">
            <Phone className="h-9 w-9 text-gray-600 bg-gray-200 m-auto p-2 rounded-lg mb-3" />
            <span className="text-gray-700 flex justify-center text-lg">+91 91513 23 2309</span>
          </div>
          <div className="p-10 bg-[#F7F7F8] border-[#F1F1F3] rounded-lg">
            <MapPin className="h-9 w-9 text-gray-600 bg-gray-200 m-auto p-2 rounded-lg mb-3" />
            <span className="text-gray-700 flex justify-center text-lg">Somewhere in the World</span>
          </div>
          <div className="p-10 bg-[#F7F7F8] border-[#F1F1F3] rounded-lg">
            <div className="flex justify-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#F1F1F3] rounded-md hover:bg-blue-600 transition">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#F1F1F3] rounded-md hover:bg-blue-400 transition">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#F1F1F3] rounded-md hover:bg-blue-800 transition ">
                <Linkedin className="h-5 w-5 text-gray-600 hover:text-white" />
              </a>

            </div>
            <h3 className="text-center mt-4 text-lg text-gray-700">Social Profiles</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
