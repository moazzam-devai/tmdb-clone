import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex justify-center items-center text-start px-19 mt-5 mb-20'>
      <div className='w-full px-6 py-8 lg:mx-80 md:mx-60'>
        <p className='text-2xl font-semibold mb-4 text-gray-800'>Reset Password</p>
        <p className='mb-6 text-sm text-gray-600'>
          Enter your email address below and we'll send you instructions to reset your password. JavaScript is required to continue.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm mb-1' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-[rgba(1,180,228)] bg-[#c1dee2] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
              required
            />
          </div>
          <div className='flex flex-col md:flex-row items-center'>
            <button
              type='submit'
              className='text-white font-bold py-2 px-4 rounded-md bg-[rgba(1,180,228)] hover:bg-[#003841] focus:outline-none'
            >
              Continue
            </button>
            <Link to='/login' className='my-2 md:my-0 md:ml-4 text-md text-[rgba(1,180,228)] hover:border-b-2 border-[rgba(1,200,228)]'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
