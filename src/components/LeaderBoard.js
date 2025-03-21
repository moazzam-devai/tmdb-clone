import React, { useState, useEffect } from 'react';

const LeaderBoard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.results.map((item, index) => ({
          id: index + 1,
          name: item.title,
          image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          allTime: item.vote_count.toString(),
          thisWeek: Math.floor(Math.random() * 1000).toString(),
        }));
        setLeaderBoardData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='px-10 my-5'>
      <div className='flex items-center mb-5'>
        <h3 className='text-black text-xl font-bold'>Leaderboard</h3>
        <div className='ms-3 flex flex-col'>
          <div className='flex items-center mb-2'>
            <div className='doubleColor2 p-1 rounded-full'></div>
            <div className='ms-2 font-semibold text-sm'>All Time Edits</div>
          </div>
          <div className='flex items-center'>
            <div className='doubleColor1 p-1 rounded-full'></div>
            <div className='ms-2 font-semibold text-sm'>Edits This Week</div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {leaderBoardData.slice(0,10).map(item => {
          
          const allTimeBarWidth = (parseInt(item.allTime.replace(/,/g, '')) / 50000) * 100;
          const thisWeekBarWidth = (parseInt(item.thisWeek.replace(/,/g, '')) / 1000) * 100;

          return (
            <div key={item.id} className='flex items-center mx-3'>
              <div className='w-16 h-16 mr-4 flex items-center justify-center'>
                {item.image ? (
                  <img src={item.image} alt={item.name} className='w-14 h-14 rounded-full object-cover' />
                ) : (
                  <div className='w-16 h-16 flex items-center justify-center text-lg font-bold bg-gray-200 rounded-full'>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className='flex-1'>
                <h5 className='text-lg text-left font-semibold'>{item.name}</h5>
                <div className='my-1'>
                  <div className='flex items-center mb-1'>
                    <div className='w-full h-2 rounded-full mr-2 flex'>
                      <div
                        className='h-full allTime rounded-full'
                        style={{ width: `${allTimeBarWidth}%` }}
                      ></div>
                      <div className='h-full flex items-center pl-2 text-xs font-semibold text-sm text-black'>
                        {item.allTime}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-full h-2 rounded-full mr-2 flex'>
                      <div
                        className='h-full thisWeek rounded-full'
                        style={{ width: `${thisWeekBarWidth}%` }}
                      ></div>
                      <div className='h-full flex items-center pl-2 text-xs font-semibold text-sm text-black'>
                        {item.thisWeek}
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderBoard;
