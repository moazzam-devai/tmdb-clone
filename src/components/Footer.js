import React from 'react';

const Footer = () => {

  return (
    <div className='lg:px-230px ' style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
      <footer className="body-font">
        <div className="container px-10 pt-10 pb-20 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 md:text-left flex flex-col justify-between">
            <a className="flex title-font font-medium md:justify-start justify-center text-gray-900">
              <img
                style={{ width: '160px' }}
                className='ml-auto'
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                alt="TMDB Logo"
              />
            </a>
            <button 
              className="mt-2 rounded-md py-2 px-4 mt-7 font-bold self-end" 
              style={{backgroundColor:'white', color:'rgb(10, 211, 211)'}}
            >
              JOIN THE COMMUNITY
            </button>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center pt-5">
            <div className="lg:w-1/5 md:w-1/2 w-full">
              <h2 className="title-font font-bold text-white tracking-widest text-sm">THE BASICS</h2>
              <nav className="list-none mb-10">
                <li><a className="text-white">ABOUT TMBD</a></li>
                <li><a className="text-white">CONTACT US</a></li>
                <li><a className="text-white">SUPPORT FORUMS</a></li>
                <li><a className="text-white">API</a></li>
                <li><a className="text-white">SYSTEM STATUS</a></li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-1">
              <h2 className="title-font font-bold text-white tracking-widest text-sm mb-3">GET INVOLVED</h2>
              <nav className="list-none mb-10">
                <li><a className="text-white">Contribution Bible</a></li>
                <li><a className="text-white">Add New Movie</a></li>
                <li><a className="text-white">Add New TV Show</a></li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-1">
              <h2 className="title-font font-bold text-white tracking-widest text-sm mb-3">COMMUNITY</h2>
              <nav className="list-none mb-10">
                <li><a className="text-white">Guidelines</a></li>
                <li><a className="text-white">Discussions</a></li>
                <li><a className="text-white">LeaderBoard</a></li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-1">
              <h2 className="title-font font-bold text-white tracking-widest text-sm mb-3">LEGAL</h2>
              <nav className="list-none mb-10">
                <li><a className="text-white">Terms of Use</a></li>
                <li><a className="text-white">API Terms of Use</a></li>
                <li><a className="text-white">Privacy Policy</a></li>
                <li><a className="text-white">DMCA Policy</a></li>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
