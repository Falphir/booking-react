import { Layout } from 'antd';
import { useState } from 'react';
import '../../App.css'
import BannerSection from '../BannerSection'
import RoomsCard from '../Cards/allRooms/Rooms'
import { Navigate } from 'react-router-dom';



function Home() {

    return (
        <>
            <BannerSection />
            <RoomsCard></RoomsCard>
        </>
    )
}

export default Home