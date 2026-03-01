import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearMessages } from '../features/auth/authSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TestimonialSlider from '@/components/TestimonialSlider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token,'tokentokentoken');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(state => state.auth);

  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password,c_password }))
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

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
  
            <h1 className='text-3xl font-bold text-center'>Reset Password</h1>
            <p className='text-[#59595A] text-center mt-3'>Welcome back! Please log in to access your account.</p>
            <div className='space-y-4 mb-10'>
              
              <div className='w-full lg:w-lg'>
                <Label className="text-sm mb-2 text-[#262626]">New Password</Label>
                <Input type="password" name="password" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5'  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
              </div>

              <div className='w-full lg:w-lg'>
                <Label className="text-sm mb-2 text-[#262626]">Confirm Password</Label>
                <Input type="password" name="c_password" className='bg-[#FCFCFD] border border-[#F1F1F3] p-5'  value={c_password} onChange={(e) => setC_password(e.target.value)} placeholder="Enter Password" />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              {successMessage && <p className="text-green-600">{successMessage}</p>}
            
              <Button className="w-full p-6 bg-orange-400 text-white text-lg mt-4 cursor-pointer" disabled={loading}>{loading ? 'Loading...' : 'Reset Password'}</Button>
            </div>
            <div className="flex items-center justify-center gap-2 my-4">
              <div className="flex-1 border-t border-[#E4E4E7]"></div>
              <span className="text-gray-500">OR</span>
              <div className="flex-1 border-t border-[#E4E4E7]"></div>
            </div>
            </form>
          
          </div>
        </div>
      </div>
  );
};

export default ResetPassword