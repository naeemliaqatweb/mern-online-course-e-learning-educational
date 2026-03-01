import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import TestimonialSlider from '@/components/TestimonialSlider';

import { verifyCode, resendCode } from '../features/auth/authSlice';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.auth);

  // email from register step (passed via location state or query param)
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
   const user = storedUser? JSON.parse(storedUser) : null;
   const [email , setEmail] = useState(user?.email);


  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // auto move
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = code.join("");
    if (finalCode.length !== 6) return alert("Enter 6 digit code");
    if(email){
      dispatch(verifyCode({ email, code: finalCode }))
      .unwrap()
      .then(() => navigate("/home"))
      .catch(() => {});
    }
  };

  const handleResend = () => {
    dispatch(resendCode({ email }));
    setCode("");
  };

  return (
    <div className='container m-auto mb-20'>
      <div className='grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 place-content-center place-items-center'>
        <div>
          <h2 className='text-3xl font-bold'>Students Testimonials</h2>
          <p className='text-[#59595A]'>
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et.
          </p>
          <div className='mt-'>
            <TestimonialSlider />
          </div>
        </div>

        <div className='bg-white rounded-lg border border-[#F1F1F3] p-10'>
          <h1 className='text-3xl font-bold text-center'>Verify Your Email</h1>
          <p className='text-[#59595A] text-center mt-3'>Enter the 6-digit code sent to your email.</p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex justify-between gap-2 mb-6">
              {code.map((digit, i) => (
                <Input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[i] = el)}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg"
                />
              ))}
            </div>

            <Button type="submit" className="w-full p-6 bg-orange-400 text-white text-lg cursor-pointer" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>

            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
            {success && <p className="text-green-500 text-center mt-3">{success}</p>}
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Didn’t receive the code?{" "}
              <button onClick={handleResend} className="text-orange-500 underline cursor-pointer" disabled={loading}>
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
