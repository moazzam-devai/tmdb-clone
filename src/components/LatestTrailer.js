import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
import axios from 'axios';
import Modal from 'react-modal';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const LatestTrailer = () => {
  const [trailers, setTrailers] = useState([]);
  const [backgroundImg, setBackgroundImg] = useState('');
  const [selected, setSelected] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const fetchTrailers = async (category) => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (category) {
        case 'popular':
          endpoint = '/movie/popular';
          break;
        case 'streaming':
          endpoint = '/movie/now_playing';
          break;
        case 'tv':
          endpoint = '/tv/popular';
          break;
        case 'rent':
          endpoint = '/movie/upcoming';
          break;
        case 'theaters':
          endpoint = '/movie/now_playing';
          break;
        default:
          endpoint = '/movie/popular';
      }

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      });

      const results = response.data.results || [];
      if (results.length > 0) {
        const videoResponses = await Promise.all(results.map(result =>
          axios.get(`${BASE_URL}/movie/${result.id}/videos`, {
            params: {
              api_key: API_KEY,
              language: 'en-US',
            },
          })
        ));
        
        const trailersWithVideos = results.map((result, index) => ({
          ...result,
          video: videoResponses[index].data.results[0] || null,
        }));

        setTrailers(trailersWithVideos);
        const backdrop = results[0].backdrop_path;
        setBackgroundImg(`https://image.tmdb.org/t/p/original${backdrop}`);
      } else {
        setTrailers([]);
        setBackgroundImg('');
      }
    } catch (error) {
      console.error(`Error fetching ${category} trailers:`, error);
      setTrailers([]);
      setBackgroundImg('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailers(selected);
  }, [selected]);

  const handleVideoClick = (e, videoKey) => {
    e.stopPropagation();
    setVideoUrl(`https://www.youtube.com/embed/${videoKey}`);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setVideoUrl('');
  };

  const handleMouseEnter = (backdropPath) => {
    if (backdropPath) {
      setBackgroundImg(`https://image.tmdb.org/t/p/original${backdropPath}`);
    }
  };

  const handleMouseLeave = () => {
    
    setBackgroundImg('');
  };

  const selectedStyle = {
    backgroundColor: 'rgb(3, 37, 65)',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(45deg, #17ead9, #6078ea)',
    WebkitBackgroundClip: 'img',
    color: 'transparent',
  };

  const gradientText = {
    position: 'relative',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'white',
    WebkitBackgroundClip: 'img',
    backgroundClip: 'img',
  };
  
  const defaultStyle = {
    backgroundColor: 'transparent',
    color: 'white',
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        breakpoint: 768,
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

  return (
    <div
      style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%',
      width: '100%',
      position: 'relative',
      }}
      className='flex items-center justify-center banner-bg mb-4'
    >
      <div
        style={{
        background: 'linear-gradient(78deg, #658494a6, #658494a6)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
      />
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12">
        <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 my-3 p-1 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4 sm:mb-0 text-white'>
            Latest Trailers
          </h2>
          <div className='relative flex space-x-2 rounded-full' style={{ border: '1px solid rgb(9, 184, 184)' }}>
            <button
              onClick={() => setSelected('popular')}
              style={selected === 'popular' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'popular' ? gradientText : {}}>
                Popular
              </span>
            </button>
            <button
              onClick={() => setSelected('streaming')}
              style={selected === 'streaming' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'streaming' ? gradientText : {}}>
                Streaming
              </span>
            </button>
            <button
              onClick={() => setSelected('tv')}
              style={selected === 'tv' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'tv' ? gradientText : {}}>
                On TV
              </span>
            </button>
            <button
              onClick={() => setSelected('rent')}
              style={selected === 'rent' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'rent' ? gradientText : {}}>
                For Rent
              </span>
            </button>
            <button
              onClick={() => setSelected('theaters')}
              style={selected === 'theaters' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'theaters' ? gradientText : {}}>
                In Theaters
              </span>
            </button>
          </div>
        </div>

        <div className='relative overflow-x-auto slider-container'>
          {loading ? (
            <p className='text-white text-center'>Loading...</p>
          ) : (
            <Slider {...sliderSettings}>
              {trailers.length > 0 ? (
                trailers.map(item => (
                  item.video && item.video.key ? (
                    <div
                      key={item.id}
                      className='inline-block w-full px-2'
                      onMouseEnter={() => handleMouseEnter(item.backdrop_path)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className='rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'>
                      <div className='relative rounded-lg'>
                        <a
                          title={item.title}
                          onClick={(e) => handleVideoClick(e, item.video.key)}
                          className='cursor-pointer rounded-lg'
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title}
                            className='w-full h-40 object-cover rounded-lg '
                          />
                          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <span className='text-white text-4xl'>
                              <i className="fa-solid fa-play"></i>
                            </span>
                          </div>
                        </a>
                      </div>

                        
                        </div>
                        <p className='text-white text-lg mt-2'>{item.title}</p>
                    </div>
                  ) : null
                ))
              ) : (
                <p className='text-white text-center'>No trailers available.</p>
              )}
            </Slider>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Video Modal"
        ariaHideApp={false}
        className='modal'
        overlayClassName='overlay'
      >
        <button onClick={handleCloseModal} className='modal-close-button'>
          X
        </button>
        {videoUrl && (
          <iframe
            width="100%"
            height="115"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='w-full h-80'
          />
        )}
      </Modal>
    </div>
  );
};

export default LatestTrailer;

