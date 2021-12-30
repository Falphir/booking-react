import React from 'react';
import '../../App.css'
import BannerSection from '../BannerSection'
import RoomsCard from '../Cards/allRooms/Rooms'

function Home() {
    return (
        <>
            <BannerSection />
            <br></br>

            <RoomsCard></RoomsCard>
        </>
    )
}

export default Home;