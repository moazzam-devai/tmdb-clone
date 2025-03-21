import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const tokenResponse = await axios.get(
        'https://api.themoviedb.org/3/authentication/token/new',
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );
      const requestToken = tokenResponse.data.request_token;

      await axios.post(
        'https://api.themoviedb.org/3/authentication/token/validate_with_login',
        {
          username: username,
          password: password,
          request_token: requestToken,
        },
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );

      const sessionResponse = await axios.post(
        'https://api.themoviedb.org/3/authentication/session/new',
        {
          request_token: requestToken,
        },
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );

      const sessionId = sessionResponse.data.session_id;

      localStorage.setItem('tmdbSessionId', sessionId);

      navigate('/');

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='lg:mx-110px px-6 w-full px-4 py-6 bg-white'>
        <p className='text-2xl font-semibold mb-1 text-left'>Login to your account</p>
        <p className='mb-3 text-left text-sm'>
          In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. 
          If you do not have an account, registering for an account is free and simple.{' '}
          <a className='text-[rgba(1,180,228)]' href='https://www.themoviedb.org/signup' target='_blank' rel='noopener noreferrer'>Click here</a> to get started.
        </p>
        <p className='mb-8 text-left text-sm'>
          If you signed up but didn't get your verification email,{' '}
          <a className='text-[rgba(1,180,228)]' href='https://www.themoviedb.org/resend' target='_blank' rel='noopener noreferrer'>click here</a> to have it resent.
        </p>
        <form onSubmit={handleLogin}>
          <div className='mb-5 text-left'>
            <label className='block text-gray-700 text-sm mb-1' htmlFor='username'>
              Username
            </label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-3 py-2 border border-[rgba(1,180,228)] bg-[#c1dee2] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
              required
            />
          </div>
          <div className='mb-10 text-left'>
            <label className='block text-gray-700 text-sm mb-1' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border border-[rgba(1,180,228)] bg-[#c1dee2] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[rgba(1,180,228)]'
              required
            />
          </div>
          <div className='flex flex-col md:flex-row items-center'>
            <button
              type='submit'
              className='text-white font-bold py-2 px-4 rounded-md hover:bg-customBlue bg-[rgba(1,180,228)] focus:outline-none'
            >
              Login
            </button>
            <Link to='/reset-password' className='my-2 md:my-0 md:ml-4 text-md text-[rgba(1,180,228)] hover:border-b-2 border-[rgba(1,200,228)]'>
              Reset password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
