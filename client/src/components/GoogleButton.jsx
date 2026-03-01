import { GoogleLogin } from '@react-oauth/google';

const GoogleButton = ({handleGoogleSuccess}) => {
  return (
    <GoogleLogin
    className="w-full bg-[#F7F7F8] p-7 text-lg border border-[#F1F1F3] mt-4 cursor-pointer" 
    onSuccess={handleGoogleSuccess}
    onError={() => console.log('Google Login Failed')}
  />

  )
}

export default GoogleButton
