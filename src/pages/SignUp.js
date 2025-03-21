import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/authentication/signup?api_key=${apiKey}`,
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );
  
      if (response.status === 200) {
        navigate('/');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
    }
  };
  
  

  return (
    <div className='flex flex-wrap lg:ml-5'>
      <div className='w-full lg:w-1/6 my-6 lg:ms-20'>
        <div className='bg-white shadow-lg rounded-lg'>
          <p className='text-lg font-semibold pr-10 pt-4 pl-5 pb-4 text-white text-left' style={{ backgroundColor: 'rgba(1,180,228)', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}>
            Benefits of being a member
          </p>
          <ul className='list-disc pl-5 pb-2 pr-5'>
            <li className='flex my-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Find something to watch on your subscribed streaming services</a>
            </li>
            <li className='flex mb-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Log the movies and TV shows you have watched</a>
            </li>
            <li className='flex mb-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Keep track of your favourite movies and TV shows and get recommendations from them</a>
            </li>
            <li className='flex mb-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Build and maintain a personal watchlist</a>
            </li>
            <li className='flex mb-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Build custom mixed lists (movies and TV)</a>
            </li>
            <li className='flex mb-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Take part in movie and TV discussions</a>
            </li>
            <li className='flex mt-2 text-left'>
              <i className="fa-solid fa-check mr-4 mt-1"></i>
              <a className="text-sm">Contribute to, and improve the information in our database</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-full lg:w-2/3 p-5 text-left'>
        <div className='pl-5'>
          <p className='text-2xl font-bold mb-2'>Sign up for an account</p>
          <p className='mb-4'>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to continue.</p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm mb-2' htmlFor='username'>
                Username
              </label>
              <input
                id='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-[rgba(1,180,228)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
                required
              />
            </div>
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm mb-2' htmlFor='password'>
                Password (4 characters minimum)
              </label>
              <input
                id='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-[rgba(1,180,228)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
                required
              />
            </div>
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm mb-2' htmlFor='passwordConfirm'>
                Password Confirm
              </label>
              <input
                id='passwordConfirm'
                type='password'
                value={formData.passwordConfirm}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-[rgba(1,180,228)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
                required
              />
            </div>
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-[rgba(1,180,228)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
                required
              />
            </div>
            <p className='mb-4'>By clicking the "Sign up" button below, I certify that I have read and agree to the TMDB terms of use and privacy policy.</p>
            <div className='flex flex-col md:flex-row items-center'>
            <button
              type='submit'
              className='text-white font-bold py-2 px-4 rounded-md hover:bg-customBlue bg-[rgba(1,180,228)] focus:outline-none'
            >
              Sign Up
            </button>
            <Link to='/' className='my-2 md:my-0 md:ml-4 text-md text-[rgba(1,180,228)] hover:border-b-2 border-[rgba(1,200,228)]'>
              Cancel
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
