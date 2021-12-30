import React from 'react';
import '../../App.css'
import BannerSection from '../BannerSection'
import Cards from '../Cards'
import RoomsCard from '../Cards/allRooms/Rooms'

function Home() {
    return (
        <>
            <BannerSection />
            {/* <Cards /> */}
            <br></br>

            <RoomsCard></RoomsCard>
        </>
    )
}

export default Home;