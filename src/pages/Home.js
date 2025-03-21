import React from 'react'
import SearchBanner from '../components/SearchBanner'
import Trending from '../components/Trending'
import LatestTrailer from '../components/LatestTrailer'
import Popular from '../components/Popular'
import FreeToWatch from '../components/FreeToWatch'
import SignUpBanner from '../components/SignUpBanner'
import LeaderBoard from '../components/LeaderBoard'

const Home = () => {
  return (
    <div className="lg:mx-110px">
        <SearchBanner/>
        <Trending/>
        <LatestTrailer/>
        <Popular/>
        <FreeToWatch/>
        <SignUpBanner/>
        <LeaderBoard/>
    </div>
  )
}

export default Home
