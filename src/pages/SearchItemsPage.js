import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

const SearchItemsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { query: initialQuery = '', results: initialResults = [] } = location.state || {};
    const isSmallScreen = useMediaQuery({ maxWidth: 390 });
    const isMediumScreen = useMediaQuery({ maxWidth: 724 });

    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState(initialResults);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === '') return;

        try {
            const response = await axios.get(`${BASE_URL}/search/multi`, {
                params: {
                    api_key: API_KEY,
                    query,
                },
            });
            setResults(response.data.results);
            navigate('.', { state: { query, results: response.data.results } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const truncateOverview = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="relative px-8">
            <div className="absolute top-0 right-0 left-0">
                <div className="bg-white py-2 text-white z-20 border-b-2">
                    <div className="flex  lg:ml-10">
                        <form onSubmit={handleSearch} className="w-full ms-3 flex">
                            <i className="fa-solid fa-magnifying-glass text-black mt-1 lg:pl-20 pr-4"></i>
                            <input
                                type="text"
                                placeholder="Search for a movie, tv show, person..."
                                className="w-full rounded bg-white border-0 text-black focus:outline-none focus:border-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row pt-20 lg:mx-[110px]">
                {/* Left Portion */}
                <div className="w-full lg:w-1/5 mb-4 lg:mb-0">
                    <div className="bg-white shadow-lg rounded-lg">
                        <p
                            className="text-lg font-semibold pr-10 pt-4 pl-5 pb-4 text-white text-left"
                            style={{
                                backgroundColor: 'rgba(1,180,228)',
                                borderTopRightRadius: '8px',
                                borderTopLeftRadius: '8px',
                            }}
                        >
                            Search Results
                        </p>
                        <ul className="list-disc pl-5 pb-2 pr-5">
                            {/* Count of various media types */}
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">Movies</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'movie').length}
                                </span>
                            </li>
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">People</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'person').length}
                                </span>
                            </li>
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">TV Shows</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'tv').length}
                                </span>
                            </li>
                            {/* Additional media types */}
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">Companies</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'companies').length}
                                </span>
                            </li>
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">Keywords</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'keywords').length}
                                </span>
                            </li>
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">Collections</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'collections').length}
                                </span>
                            </li>
                            <li className="flex my-5 justify-between">
                                <span className="text-sm">Networks</span>
                                <span className="text-gray-500 bg-gray-200 px-2 rounded-lg">
                                    {results.filter((item) => item.media_type === 'networks').length}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Portion */}
                <div className="w-full lg:w-5/6 lg:ms-10">
                    {results.map((result) => {
                        const mediaType = result.media_type === 'movie' ? 'movie' : 'tv';
                        const maxLength = isSmallScreen ? 100 : isMediumScreen ? 200 : 300;
                        const overviewText = truncateOverview(result.overview, maxLength);
                        return (
                            <Link
                                to={`/detail/${mediaType}/${result.id}`}
                                key={result.id}
                                className="block mb-4"
                            >
                                <div
                                    className="rounded-lg flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[10rem]"
                                >
                                    <div className="w-1/7">
                                        <img
                                            style={{
                                                height: '100%',
                                                borderBottomLeftRadius: '10px',
                                                borderTopLeftRadius: '10px',
                                            }}
                                            src={`https://image.tmdb.org/t/p/w500${result.poster_path || result.profile_path}`}
                                            alt={result.title || result.name}
                                        />
                                    </div>
                                    <div className="w-full px-4 py-3 text-left">
                                        <h3 className="font-bold">{result.title || result.name}</h3>
                                        <h3 className="text-gray-400">{result.release_date || result.first_air_date}</h3>
                                        <p className="mt-4 text-sm">{overviewText}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchItemsPage;
