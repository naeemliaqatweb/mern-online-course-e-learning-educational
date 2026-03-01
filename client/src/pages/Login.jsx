import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useNavigate } from 'react-router-dom';
import TestimonialSlider from '@/components/TestimonialSlider';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser , loginWithGoogle } from '../features/auth/authSlice';
import GoogleButton from '@/components/GoogleButton';
import { toast } from "sonner";
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  // logins
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    dispatch(loginUser({ userData }))
      .unwrap()
      .then((data) => {
        if(data?.success){
          toast.success("Login Successful 🎉", {
            description: "Welcome back, you are now logged in.",
          
          });
          
          navigate('/home');
        }
      })
      .catch((err) => {
        toast.error("Login Failed ❌", {
          description: err || "Invalid email or password.",
          
        });
      });
  };

  const handleGoogleSuccess = async (res) => {
    try {
      await dispatch(loginWithGoogle(res.credential))
      .unwrap()
      .then((data) => {
        toast.success("Google Login Successful 🎉", {
          description: "Welcome back, you are now logged in with Google.",
          
        });
        navigate('/home');
      })
      .catch((err) => {
        
        toast.error("Google Login Failed ❌", {
           description: err || "Something went wrong, please try again.",
         });
      });
    } catch (err) {
      toast.error("Login Failed ❌", {
        description: err || "Invalid email or password.",
      });
    }
  };
  
  

  return (
    <div className='container m-auto mb-20'>
      <div className='grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 place-content-center place-items-center'>
        <div className=''>
          <h2 className='text-3xl font-bold'>Students Testimonials</h2>
          <p className='text-[#59595A]'>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
       
          <div className='mt-4'>
            <TestimonialSlider />
          </div>
        </div>
        <div className='bg-white rounded-lg border border-[#F1F1F3] p-10'>
        <form onSubmit={handleSubmit}>

          <h1 className='text-3xl font-bold text-center'>Login</h1>
          <p className='text-[#59595A] text-center mt-3'>Welcome back! Please log in to access your account.</p>
          <div className='space-y-4 mb-10'>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Email</Label>
              <Input type="email" name="email" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter Email" />
            </div>
            <div className='w-full lg:w-lg'>
              <Label className="text-sm mb-2 text-[#262626]">Password</Label>
              <Input type="password" name="password" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter Password" />
            </div>
            <div className='flex justify-end'>
              <a href='#' onClick={() => { navigate('/forgot-password')}} className='text-right text-sm'>Forgot Password?</a>
            </div>
            <div className='flex gap-3 items-center'>
              <Checkbox id="remember" className="border border-gray-300 w-5 h-5" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <Button className="w-full p-6 bg-orange-400 text-white text-lg mt-4 cursor-pointer" disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
          </div>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="flex-1 border-t border-[#E4E4E7]"></div>
            <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t border-[#E4E4E7]"></div>
          </div>
          </form>
         <GoogleButton handleGoogleSuccess={handleGoogleSuccess} />
          
          <div className='flex justify-center items-center gap-3 my-6'>
            <p className='text-lg'>Don't have an account?</p>
            <a href="javascript:void(0)" onClick={() => navigate('/signup') } className='text-md hover:underline'> Sign Up </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
