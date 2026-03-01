import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import TestimonialSlider from '@/components/TestimonialSlider';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearMessages } from '../features/auth/authSlice';
import { useEffect } from 'react';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { loading, error, successMessage } = useSelector(state => state.auth);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      dispatch(forgotPassword({ email }));
    };
  
    useEffect(() => {
      return () => {
        dispatch(clearMessages());
      };
    }, [dispatch]);

  return (
    <div className='container m-auto mb-20'>
    <div className='grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 place-content-center place-items-center'>
      {/* Left Side - Testimonials */}
      <div>
        <h2 className='text-3xl font-bold'>Students Testimonials</h2>
        <p className='text-[#59595A]'>
          Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
        </p>
        <div className='mt-4'>
          <TestimonialSlider />
        </div>
      </div>
     
      {/* Right Side - Forgot Password */}
      <div className='bg-white rounded-lg border border-[#F1F1F3] p-10 w-full'>
    <div className="text-center mb-8">
      <div className="inline-block bg-gradient-to-br from-yellow-100 to-yellow-300 p-5 rounded-full mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full "></div>
        </div>
      </div>
    </div>
        <form onSubmit={handleSubmit}>
          <h1 className='text-3xl font-bold text-center'>Forgot Password</h1>
          <p className='text-[#59595A] text-center mt-3'>
            Welcome back! Please log in to access your account.
          </p>

          <div className='space-y-4 mb-10'>
            <div className='w-full'>
              <Label className='text-sm mb-2 text-[#262626]'>Email</Label>
              <Input
                type='email'
                name='email'
                required
                className='bg-[#FCFCFD] border border-[#F1F1F3] p-5'
                placeholder='Enter Email'
              />
            </div>

            {successMessage && <p className='text-green-600'>{successMessage}</p>}
          {error && <p className='text-red-600'>{error}</p>}
            <Button
              type='submit'
              className='w-full p-6 bg-orange-400 text-white text-lg mt-4 cursor-pointer'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Forgot Password'}
            </Button>
          </div>

          <div className='flex items-center justify-center gap-2 my-4'>
            <div className='flex-1 border-t border-[#E4E4E7]'></div>
            <span className='text-gray-500'>OR</span>
            <div className='flex-1 border-t border-[#E4E4E7]'></div>
          </div>

        </form>

        <div className='flex justify-center items-center gap-3 my-6'>
          <p className='text-lg'>Don't have an account?</p>
          <a
            href='javascript:void(0)'
            onClick={() => navigate('/signup')}
            className='text-md hover:underline'
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword
