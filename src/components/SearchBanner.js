import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBanner = () => {
  const [query, setQuery] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
          params: { api_key: API_KEY },
        });
        const trendingMovies = response.data.results;
        if (trendingMovies.length > 0) {
          const randomMovie = trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
          setBackgroundImage(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBackgroundImage();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/search/multi`, {
        params: { api_key: API_KEY, query },
      });
      navigate('/search-results', { state: { query, results: response.data.results } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '340px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      className='flex items-center justify-center'
    >
      <div
        style={{
          background: 'linear-gradient(78deg, #38aae3a6, #38aae3a6)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />
      <div className='text-left px-10 py-6' style={{ position: 'absolute', left: '0', right: '0', top: '48px', bottom: '0', zIndex: 2 }}>
        <h2 className='text-white text-4xl font-bold mb-2'>Welcome.</h2>
        <h3 className='text-white text-2xl font-bold mb-10'>
          Millions of movies, TV shows, and people to discover. Explore now.
        </h3>
        <form onSubmit={handleSearch} className='relative'>
          <input
            type="text"
            placeholder="Search for a movie, TV show, person..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='px-4 py-3 rounded-full w-full pr-20 text-grey-200'
          />
          <button
            type="submit"
            className='absolute right-0 top-0 bottom-0 px-7 py-2 text-white rounded-full doubleColor font-bold hover:text-black'
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBanner;
