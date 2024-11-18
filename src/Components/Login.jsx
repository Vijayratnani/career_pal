import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/careerPalLogo.png';
import Google from '../assets/googleIcon.png';
import Microsoft from '../assets/microsoftIcon.png';

const CareerPalLogin = () => {

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Authentication logic here
    navigate('/chat');
  };

  return (
    <div className="flex justify-center items-center ">
      <div className=" p-10  max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <img src={Logo} alt="Logo" className='h-20 w-20 mx-auto'/>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            Career<span className="text-orange-600">PAL</span>
          </div>
          <p className="text-lg font-semibold text-black">Welcome back</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div class="relative z-0 w-full mb-5 group">
            <input 
            type="email" 
            name="floating_email" 
            id="floating_email" 
            class="block py-2.5 px-2 w-full text-gray-900 bg-transparent border-2 
            border-orange-500 appearance-none dark:text-white dark:border-orange-600 
            dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 
            peer" placeholder=" " required />
            <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-orange-500 dark:text-gray-400 
            duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 
            rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 
            peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
            bg-white ml-2 peer-focus:ml-1 px-1 rounded-full">Email address</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input 
            type="password" 
            name="floating_password" 
            id="floating_password" 
            class="block py-2.5 px-2 w-full text-gray-900 bg-transparent border-2 
            border-orange-500 appearance-none dark:text-white dark:border-orange-600 
            dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
            <label 
            for="floating_password" 
            class="peer-focus:font-medium absolute text-sm text-orange-500 dark:text-gray-400 
            duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 
            rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
            peer-focus:-translate-y-6 bg-white ml-2 peer-focus:ml-1 px-1 rounded-full">
              Password
            </label>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-[10px] rounded-sm font-semibold
             hover:bg-orange-700 focus:outline-none"
          >
            Continue
          </button>
        </form>

        {/* Sign-up Link */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-orange-600 font-medium">Sign up</a>
        </div>

        {/* Divider */}
        <div className="flex items-center mt-6 mb-4">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center bg-white border border-gray-300 px-4
             py-[10px] rounded-md text-gray-700 font-medium hover:bg-gray-100"
          >
            <img src={Google} alt="Google" className="w-5 h-5 mr-3" />
            <span className='mx-auto'>Continue with Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-white border border-gray-300 px-4
             py-[10px] rounded-md text-gray-700 font-medium hover:bg-gray-100"
          >
            <img src={Microsoft} alt="Microsoft" className="w-5 h-5 mr-3" />
            <span className='mx-auto'>Continue with Microsoft Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerPalLogin;
