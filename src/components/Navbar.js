import React, { useState, useEffect  } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
    const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] = useState(false);
    const [isTVShowsDropdownOpen, setIsTVShowsDropdownOpen] = useState(false);
    const isSmallScreen = useMediaQuery({ maxWidth: 810 });

    const location = useLocation();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen);
    };
    const toggleMoviesDropdown = () => {
        setIsMoviesDropdownOpen(!isMoviesDropdownOpen);
    };

    const toggleTVShowsDropdown = () => {
        setIsTVShowsDropdownOpen(!isTVShowsDropdownOpen);
    };

    const togglePeopleDropdown = () => {
        setIsPeopleDropdownOpen(!isPeopleDropdownOpen);
    };
    
    const { query: initialQuery = '', results: initialResults = [] } = location.state || {};

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
            navigate('/search-results', { state: { query, results: response.data.results } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    useEffect(() => {
        // Add or remove 'no-scroll' class based on the mobile menu state
        if (isMobileMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isMobileMenuOpen]);

    return (
        <div className='relative'>
            <nav style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    
                    

                    {/* Desktop menu */}
                    {!isSmallScreen && (
                        <div className="flex items-center w-full">
                            <div className="flex items-center space-x-8 rtl:space-x-reverse w-full md:w-auto">
                                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <Link to='/'><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" className="h-5" alt="Flowbite Logo" /></Link>
                                </a>
                                <ul className="hidden md:flex font-medium flex-row space-x-8 rtl:space-x-reverse">
                                    <li className="relative group">
                                        <a className="block py-2 px-3 text-sm text-white rounded md:bg-transparent md:p-0 dark:text-white">
                                            Movies
                                        </a>
                                        <div className="absolute z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                                            <Link to="/featured-page" state={{ category: 'movie', type: 'popular' }}  className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Popular</Link>
                                            <Link to="/featured-page" state={{ category: 'movie', type: 'now_playing' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Now Playing</Link>
                                            <Link to="/featured-page" state={{ category: 'movie', type: 'upcoming' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Upcoming</Link>
                                            <Link to="/featured-page" state={{ category: 'movie', type: 'top_rated' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Top Rated</Link>
                                        </div>
                                    </li>
                                    <li className="relative group">
                                        <a className="block py-2 px-3 text-white text-sm rounded md:bg-transparent md:p-0 dark:text-white">
                                            TV Shows
                                        </a>
                                        <div className="absolute z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                                            <Link to="/featured-page" state={{ category: 'tv', type: '' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Popular</Link>
                                            <Link to="/featured-page" state={{ category: 'tv', type: 'airing_today' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Airing Today</Link>
                                            <Link to="/featured-page" state={{ category: 'tv', type: 'on_the_air' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">On TV</Link>
                                            <Link to="/featured-page" state={{ category: 'tv', type: 'top_rated' }} className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Top Rated</Link>
                                        </div>
                                    </li>
                                    <li className="relative group">
                                        <a href="#" className="block py-2 px-3 text-white text-sm rounded md:bg-transparent md:p-0 dark:text-white">
                                            People
                                        </a>
                                        <div className="absolute z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                                            <Link to="/person" className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Popular People</Link>
                                        </div>
                                    </li>
                                    <li className="relative group">
                                        <a href="#" className="block py-2 px-3 text-white text-sm rounded md:bg-transparent md:p-0 dark:text-white">
                                            More
                                        </a>
                                        <div className="absolute z-10 py-2 hidden group-hover:block group-focus:block w-48 bg-white rounded-lg shadow-md">
                                            <a href="#" className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Discussions</a>
                                            <a href="#" className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Leaderboard</a>
                                            <a href="#" className="block px-6 py-2 text-sm text-left hover:bg-gray-100">Support</a>
                                            <a href="#" className="block px-6 py-2 text-sm text-left hover:bg-gray-100">API</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex items-center space-x-8 rtl:space-x-reverse ml-auto">
                                <ul className="flex font-medium flex-row space-x-8 rtl:space-x-reverse">
                                    <li>
                                        <a href="#" className="block py-2 px-3 mt-1 text-white text-sm font-bold rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">
                                            <i className="fa-solid fa-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-2 px-3 border border-white text-sm rounded hover:bg-white hover:text-black text-white md:py-1 md:px-2 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent">
                                            EN
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/login" className="block py-2 px-3 mt-1 text-white text-sm rounded md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="block py-2 px-3 mt-1 text-white text-sm rounded md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent">
                                            Join TMDB
                                        </Link>
                                    </li>
                                    {!isSearchBarOpen && (
                                        <li>
                                            <button
                                                onClick={toggleSearchBar}
                                                className="block  px-3  text-white text-sm rounded md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent"
                                            >
                                                <i className="fa-solid fa-magnifying-glass text-lg text-blue-300"></i>
                                            </button>
                                        </li>

                                    ) }
                                    {isSearchBarOpen && (
                                        <li>
                                            <button
                                                onClick={toggleSearchBar}
                                                className="block  px-3  text-white text-sm rounded md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent"
                                            >
                                                <i class="fa-solid fa-xmark text-xl text-blue-300 "></i>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    {isSmallScreen && (
                        <div className="flex items-center w-full">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-white mr-4"
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            <a href="https://flowbite.com/" className="flex items-center mx-auto space-x-3 me-5 ps-5 rtl:space-x-reverse">
                                <Link to='/'><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" className="h-9" alt="Flowbite Logo" /></Link>
                            </a>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse ml-auto">
                                {!isSearchBarOpen && (
                                        <li className='inline block'>
                                            <button
                                                onClick={toggleSearchBar}
                                                className="block  px-3  text-white text-sm rounded md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent"
                                            >
                                                <i className="fa-solid fa-magnifying-glass text-lg text-blue-300"></i>
                                            </button>
                                        </li>

                                    ) }
                                    {isSearchBarOpen && (
                                        <li className='inline block'>
                                            <button
                                                onClick={toggleSearchBar}
                                                className="block  px-3  text-white text-sm rounded md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent"
                                            >
                                                <i class="fa-solid fa-xmark text-xl text-blue-300 "></i>
                                            </button>
                                        </li>
                                    )}
                                <Link to="/login" className="text-white text-sm">Login</Link>
                            </div>
                        </div>
                    )}

                    {/* Mobile drawer menu */}
                    {isSmallScreen && (
                        <div 
                            className={`fixed inset-0 top-16 p-4 md:hidden z-50 w-4/5 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} 
                            style={{ backgroundColor: 'rgb(3, 33, 65)' }}
                        >
                            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                                <ul className="flex flex-col space-y-4 mt-4 text-left ps-3">
                                    <li className="relative">
                                        <button onClick={toggleMoviesDropdown} className="block py-1 text-white font-bold">
                                            Movies
                                        </button>
                                        <ul className={`space-y-2 ${isMoviesDropdownOpen ? 'block' : 'hidden'}`}>
                                            <li><Link to="/featured-page" state={{ category: 'movie', type: 'popular' }} className="block py-2 px-4 text-white text-sm">Popular</Link></li>
                                            <li><Link to="/featured-page" state={{ category: 'movie', type: 'now_playing' }} className="block py-2 px-4 text-white text-sm">Now Playing</Link></li>
                                            <li><Link to="/featured-page" state={{ category: 'movie', type: 'upcoming' }} className="block py-2 px-4 text-white text-sm">Upcoming</Link></li>
                                            <li><Link to="/featured-page" state={{ category: 'movie', type: 'top_rated' }} className="block py-2 px-4 text-white text-sm">Top Rated</Link></li>
                                        </ul>
                                    </li>
                                    <li className="relative">
                                        <button onClick={toggleTVShowsDropdown} className="block py-1 text-white font-bold">
                                            TV Shows
                                        </button>
                                        <ul className={`space-y-2 ${isTVShowsDropdownOpen ? 'block' : 'hidden'}`}>
                                            <li><Link to="/featured-page" state={{ category: 'tv', type: '' }} className="block py-2 px-4 text-white text-sm">Popular</Link></li>
                                            <li><Link to="/featured-page" state={{ category: 'tv', type: 'airing_today' }} className="block py-2 px-4 text-white text-sm">Airing Today</Link></li>
                                            <li><Link to="/featured-page" state={{ category: 'tv', type: 'on_the_air' }} className="block py-2 px-4 text-white text-sm">On TV</Link></li>
                                            <li><Link to="/featured-page" state={{ category: 'tv', type: 'top_rated' }} className="block py-2 px-4 text-white text-sm">Top Rated</Link></li>
                                        </ul>
                                    </li>
                                    <li className="relative">
                                        <button onClick={togglePeopleDropdown} className="block py-1 text-white font-bold">
                                            People
                                        </button>
                                        <ul className={`space-y-2 ${isPeopleDropdownOpen ? 'block' : 'hidden'}`}>
                                            <li><Link to="/person" className="block py-2 px-4 text-white text-sm">Popular People</Link></li>
                                        </ul>
                                    </li>
                                    <li><a href="#" className="text-white font-bold">More</a></li>
                                    <li><Link to="/login" className="text-white font-bold">Login</Link></li>
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </nav>

            {/* Search Bar */}
            {isSearchBarOpen && (
                <div className="absolute top-15 right-0 left-0 top-15 bg-white py-2 z-20">
                    <div className='flex'>
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
            )}

        </div>
    );
};

export default Navbar;
