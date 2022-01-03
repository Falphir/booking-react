import { Layout } from 'antd';
import { useState } from 'react';
import '../../App.css'
import BannerSection from '../BannerSection'
import RoomsCard from '../Cards/allRooms/Rooms'
import { Navigate } from 'react-router-dom';
import Footer from '../Footer';



function Home() {

    return (
        <>
            <BannerSection />
            <RoomsCard></RoomsCard>
            <Footer />
        </>
    )
}

export default Home