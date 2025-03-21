import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const DetailPage = () => {
  const { id, mediaType } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
          params: {
            api_key: API_KEY,
            append_to_response: 'videos',
          },
        });
        setItemDetail(response.data);
        const trailer = response.data.videos.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, mediaType]);

  useEffect(() => {
    if (itemDetail && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const percentage = Math.round(itemDetail.vote_average * 10);
      const canvasSize = 60;
      const radius = (canvasSize - 10) / 2;
      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;

      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgb(3, 37, 65)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, (2 * Math.PI * (percentage / 100)) - 0.5 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#4caf50';
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = '15px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}%`, centerX, centerY);
    }
  }, [itemDetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!itemDetail) {
    return <div>Error loading details</div>;
  }

  const backgroundImage = `https://image.tmdb.org/t/p/w1280${itemDetail.backdrop_path}`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        objectFit: 'cover',
      }}>
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />
      {/* Gradient Overlay */}
      <div
        style={{
          background: 'linear-gradient(78deg, #5c5c5ca6, #5c5c5ca6)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />
      {/* Content */}
      <div className='container mx-auto p-6 lg:mx-110px' style={{ position: 'relative', zIndex: 2 }}>
        <div className='flex flex-col sm:flex-row'>
          <div className='w-full lg:w-1/6'>
            <img
              className='h-auto rounded-lg'
              src={`https://image.tmdb.org/t/p/w500${itemDetail.poster_path}`}
              alt={itemDetail.title || itemDetail.name}
            />
          </div>
          <div className='sm:ml-4 mt-4 sm:mt-0 w-full lg:w-2/3 pl-5'>
            <div>
              <div className='flex'>
                <h2 className='text-3xl font-semibold text-left text-white'>{itemDetail.title}</h2>
              </div>
              
              <p className='text-white text-md text-left flex'>
              <p className='text-white text-md'>{itemDetail.release_date}</p>
                {itemDetail.genres.map((genre) => (
                  <span key={genre.id} className='text-md mx-2'>. {genre.name}</span>
                ))}
                <span>{Math.floor(itemDetail.runtime / 60)}h {itemDetail.runtime % 60}m</span>
              </p>
            </div>

            <div className='mt-4 text-left'>
              <canvas ref={canvasRef} width="100" height="100"></canvas>
            </div>

            <div className='flex space-x-6'>
                <div className='relative flex flex-col items-center text-white group'>
                  <div
                    className='flex items-center justify-center rounded-full'
                    style={{ backgroundColor: 'rgb(3, 37, 65)', width: '40px', height: '40px' }}>
                    <i className="fa-solid fa-list mx-auto"></i>
                  </div>
                </div>

                <div className='relative flex flex-col items-center text-white group'>
                  <div
                    className='flex items-center justify-center rounded-full'
                    style={{ backgroundColor: 'rgb(3, 37, 65)', width: '40px', height: '40px' }}>
                    <i className="fa-solid fa-heart mx-auto"></i>
                  </div>
                </div>

                <div className='relative flex flex-col items-center text-white group'>
                  <div
                    className='flex items-center justify-center rounded-full'
                    style={{ backgroundColor: 'rgb(3, 37, 65)', width: '40px', height: '40px' }}>
                    <i className="fa-solid fa-bookmark mx-auto"></i>
                  </div>
                </div>

                <div
                  className='flex items-center font-semibold text-white hover:text-gray-300'
                  onClick={() => setIsModalOpen(true)}
                >
                  <i className="fa-solid fa-play mr-2"></i> Play Trailer
                </div>
              </div>

              <div>
                <p className='text-lg mt-4 text-left font-bold text-white'>Overview</p>
                <p className='text-md text-left text-white'>{itemDetail.overview}</p>
              </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <iframe
                width="100%"
                height="400"
                src={trailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
