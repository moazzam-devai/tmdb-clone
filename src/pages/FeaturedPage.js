import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const FeaturedPage = () => {
    const location = useLocation();
    const { category, type } = location.state || {};
    const [data, setData] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    useEffect(() => {
        if (category && type) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/${category}/${type}`, {
                        params: {
                            api_key: API_KEY,
                        },
                    });
                    setData(response.data.results);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [category, type]);


    const getVotePercentage = (voteAverage) => {
        return (voteAverage * 10).toFixed(0) + '%';
    };

    const formatText = (text) => {
        if (!text) return '';
        const replacedText = text.replace(/_/g, ' ');
        return replacedText
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getTitle = (item) => {
        return category === 'tv' ? item.name : item.title;
    };

    return (
        <div className='lg:mx-110px'>
            <h1 className="text-2xl font-bold mt-5 ms-6 text-left">{formatText(type)}{" "}{formatText(category)}</h1>
            <div className='flex flex-wrap my-5 '>
                <div className='w-full lg:w-1/5 ms-6'>
                   
                    <div className='w-full flex justify-between border-gray-300 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-3'>
                        <p>Sort</p>
                        <i className="fa-solid fa-angle-right mt-1"></i>
                        <div className=" z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                            <hr/>
                        </div>
                    </div>
                    <div className='w-full flex justify-between mt-4 border-gray-300 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-3'>
                        <p>Where To Watch</p>
                        <div>
                            <i className="fa-solid fa-angle-right mt-1 ms-1"></i>
                            <div className=" z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                                <hr/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-between mt-4 border-gray-300 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-3'>
                        <p>Filters</p>
                        <i className="fa-solid fa-angle-right mt-1"></i>
                        <div className=" z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                            <hr/>
                        </div>
                    </div>
                    <div className='rounded-full py-2 w-full mt-4 bg-gray-200 text-gray-400 font semibold'>
                        <p>Search</p>
                    </div>
                </div>
                
                <div className='w-full lg:w-3/4 ms-10'>
                    {data.length === 0 ? (
                        <div className='w-full text-center mt-10'>
                            <p className='text-mg text-gray-500'>No items were found that match your query.</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                            {data.map(item => (
                                <div key={item.id} className='flex flex-col'>
                                    <div className='rounded-lg p-2'>
                                        <div className='relative'>
                                            <Link to={`/detail/${category}/${item.id}`}>
                                                <a title={getTitle(item)}>
                                                    <img
                                                        loading="lazy"
                                                        className='w-full h-52 rounded-lg object-cover'
                                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                                        alt={getTitle(item)}
                                                    />
                                                </a>
                                            </Link>
                                            <div className='absolute top-2 right-2'>
                                                <a href="#" aria-label="View Item Options">
                                                    <div className='bg-white px-2 pb-1 rounded-full hover:bg-blue-400'>
                                                        <i className="fa-solid fa-ellipsis text-xs"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className='-mt-4 ms-2'>
                                            <div className='flex items-center space-x-2'>
                                                <div className='relative'>
                                                    <div className='w-10 h-10 rounded-full border-2 flex items-center justify-center' style={{backgroundColor:'rgb(3, 37, 65)'}}> {/* Adjust size */}
                                                        <div className='relative w-8 h-8'>
                                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                                <span className='text-xs font-bold text-white'>{getVotePercentage(item.vote_average)}</span>
                                                            </div>
                                                            <canvas className='w-full h-full' height="34" width="34" style={{ height: '34px', width: '34px' }}></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h2 className='text-lg text-left font-semibold'>
                                                <a className='text-black overflow-x-hidden w-90%'>{getTitle(item) ? getTitle(item).slice(0,17) : 'No Title Available'}</a>
                                            </h2>
                                            <h2 className='text-md text-left font-semibold mt-2'>
                                                <a className='text-gray-600'>{item.release_date || 'No Release Date'}</a>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FeaturedPage;
