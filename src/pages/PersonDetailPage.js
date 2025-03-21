import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';

const API_KEY = process.env.REACT_APP_API_KEY;

const PersonDetailPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);

  const fetchPersonDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`);
      if (!response.ok) {
        throw new Error('Failed to fetch person details');
      }
      const data = await response.json();
      setPerson(data);

      const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
      const creditsData = await creditsResponse.json();
      setItems(creditsData.cast || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    swipeToSlide: true,
    arrows: false,
    draggable: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const truncateBiography = (biography) => {
    const truncated = biography.split(' ').slice(0, 100).join(' ') + '...';
    return showFullBio ? biography : truncated;
  };

  return (
    <div className='p-6 overflow-hidden mt-5'>
      <div className='container text-left lg:mx-32 max-w-full'>
        <div className='flex flex-col sm:flex-row'>
          <div className='w-full lg:w-1/4'>
            <img
              className='w-full h-[30rem] rounded-lg object-cover'
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
            />
          </div>
          <div className='sm:ml-6 mt-6 sm:mt-0 w-full lg:w-1/2'>
            <h2 className='text-4xl font-semibold'>{person.name}</h2>
            <div className='mt-4'>
              <p className='text-xl font-semibold'>Biography</p>
              <p className='text-sm mt-2'>
                {truncateBiography(person.biography)}
                {!showFullBio && person.biography.split(' ').length > 100 && (
                  <span
                    onClick={() => setShowFullBio(true)}
                    className='text-blue-500 cursor-pointer ml-2'
                  >
                    Read More
                  </span>
                )}
              </p>
              {showFullBio && (
                <span
                  onClick={() => setShowFullBio(false)}
                  className='text-blue-500 cursor-pointer mt-2 block'
                >
                  Show Less
                </span>
              )}
            </div>
            <div className='mt-8'>
              <p className='text-xl font-semibold'>Known For</p>
              <Slider {...sliderSettings}>
                {items.map((item) => (
                  <div key={item.id} className='p-1'>
                    <div className='relative'>
                      <Link to={`/detail/movie/${item.id}`}>
                        <img
                          className='w-full h-[10rem] rounded-lg object-cover'
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title || item.name}
                        />
                      </Link>
                    </div>
                    <div className='mt-2'>
                      <p className='text-sm text-center'>{item.title || item.name}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
