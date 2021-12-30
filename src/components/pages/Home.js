import React from 'react';
import '../../App.css'
import BannerSection from '../BannerSection'
import RoomsCard from '../Cards/allRooms/Rooms'

function Home() {
    return (
        <>
            <BannerSection />
            <RoomsCard></RoomsCard>
        </>
    )
}

export default Home;