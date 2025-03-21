import React from 'react';
import { Link } from 'react-router-dom';

const SignUpBanner = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("./images/banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
      }}
      className='flex items-center justify-center mb-10 w-full min-h-[530px] sm:min-h-[410px] md:min-h-[310px]'
    >
      <div className='text-left px-10 py-1' style={{ position: 'absolute', left: '0', right: '0', top: '48px', bottom: '0' }}>
        <h2 className='text-white text-3xl font-bold'>Join Today</h2>
        <p className='text-white text-lg my-8'>
          Get access to maintain your own <span className='text-gray-400'>custom personal lists, track what you've seen</span> and
           search and filter for <span className='text-gray-400'>what to watch next</span>—regardless if it's in theatres, on TV or available on popular streaming services like 
          <span className='text-gray-400'> Netflix, Amazon Prime Video, Zee5, Sun Nxt, and MUBI</span>.
        </p>
        <Link to='/signup'><button className='px-4 py-2 text-white rounded-sm text-md font-bold' style={{ backgroundColor: 'rgba(128,91,231)' }}>
            Sign Up
        </button></Link>
      </div>
    </div>
  );
};

export default SignUpBanner;
