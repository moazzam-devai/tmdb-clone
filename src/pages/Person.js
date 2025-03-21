import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

const Person = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopularPeople = async (page) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch popular people data');
      }
      const data = await response.json();
      setPeople(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularPeople(page);
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className='lg:mx-110px'>
      <h1 className='text-left p-6 font-semibold text-2xl'>Popular People</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6'>
        {people.map((person) => (
          <div key={person.id} className='shadow-lg border-2 border-slate-100 rounded-lg w-100%'>
            <Link to={`/person/${person.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                style={{ borderTopRightRadius: '10px', borderTopLeftRadius: '10px', borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px', width: '100%', height: '20rem', objectFit: 'cover' }}
                alt={person.name}
              />
            </Link>
            <div className='text-left p-2'>
              <h3 className='text-black font-semibold'>{person.name}</h3>
              <p className='text-gray-500 text-sm'>{person.known_for.map(movie => movie.title || movie.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>

     
      <div className='flex justify-center my-2'>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 mx-2 rounded ${page === 1 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black'}`}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <span className='px-4 py-2 mx-2 rounded text-black'>
          {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 mx-2 rounded ${page === totalPages ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black'}`}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Person;
