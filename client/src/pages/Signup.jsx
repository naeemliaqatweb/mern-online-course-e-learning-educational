import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useNavigate } from 'react-router-dom';
import TestimonialSlider from '@/components/TestimonialSlider';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser ,loginWithGoogle } from '../features/auth/authSlice';
import GoogleButton from '@/components/GoogleButton';
import { toast } from "sonner";


const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
 
  //register
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };

    dispatch(registerUser({ userData }))
      .unwrap()
      .then(() => 
      {
        toast.success("Signup Successful 🎉", {
          description: "Account created! Please verify your email.",
        
        });
        navigate('/verify-email')
      }
    )
      .catch((err) => {
         toast.error("Signup Failed ❌", {
            description: err || "Invalid email or password.",
          });
      });
  };

    const handleGoogleSuccess = async (res) => {
      try {
        await dispatch(loginWithGoogle(res.credential))
        .unwrap()
        .then((data) => {
          console.log(data,'data');
          toast.success("Signup Successful 🎉", {
            description: "Account created! Please verify your email.",
          
          });
          navigate('/home');
        })
        .catch((err) => {
           toast.error("Google Login Failed ❌", {
            description: err || "Something went wrong, please try again.",
          });
        });
      } catch (err) {
         toast.error("Google Login Failed ❌", {
            description: err || "Something went wrong, please try again.",
          });
      }
    };

  return (
    <div className='container m-auto mb-20'>
      <div className='grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 place-content-center place-items-center'>
          <div className=''>
            <h2 className='text-3xl font-bold'>Students Testimonials</h2>
            <p className='text-[#59595A]'>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
          
            <div className='mt-'>
                <TestimonialSlider />
              </div>
          </div>
        <div className='bg-white rounded-lg border border-[#F1F1F3] p-10'>
          <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
          <p className='text-[#59595A] text-center mt-3'>Create an account to unlock exclusive features.</p>
          <form onSubmit={handleSubmit}>

          <div className='space-y-4 mb-10'>
          <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Full Name</Label>
              <Input type="text" name="name" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}  placeholder="Enter Full Name" />
            </div>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Email</Label>
              <Input type="email" name="email" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}  placeholder="Enter Email" />
            </div>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Password</Label>
              <Input type="password" name="password" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}  placeholder="Enter Password" />
            </div>
            <div className='flex justify-end'>
              <a href='#' onClick={() => { navigate('/forgot-password')}} className='text-right text-sm'>Forgot Password?</a>
            </div>
            <div className='flex gap-3 items-center'>
              <Checkbox id="remember" className="border border-gray-300 w-5 h-5" required />
              <Label htmlFor="remember">I agree with <a href="" className="underline">Terms of Use</a> and <a href="" className='underline'>Privacy Policy</a></Label>
            </div>
            <Button className="w-full p-6 bg-orange-400 text-white text-lg mt-4 cursor-pointer" disabled={loading}>{loading ? 'Loading...' : 'Register'}</Button>

          </div>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="flex-1 border-t border-[#E4E4E7]"></div>
            <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t border-[#E4E4E7]"></div>
          </div>
          <GoogleButton handleGoogleSuccess={handleGoogleSuccess} />
          {/* <Button className="w-full bg-[#F7F7F8] p-7 text-lg border border-[#F1F1F3] mt-4 cursor-pointer"><img src={googleIcon} className='w-6 h-6' alt="" />Sign Up with Google</Button> */}
          </form>
          <div className='flex justify-center items-center gap-3 my-6'>
            <p className='text-lg'>Already have an account?</p>
            <a href="javascript:void(0)" onClick={() => navigate('/login') } className='text-md hover:underline'> Login </a>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Signup
