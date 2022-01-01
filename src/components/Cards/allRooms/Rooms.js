import './Rooms.css';
import Config from '../../../config';
import React from 'react';
import { Navigate } from 'react-router-dom';
import RoomsCard from './RoomsCard';


const Rooms = () => {

    return (
        <div className='room-container'>
            <h1>Check out these Rooms!</h1>
            <div className='cards__container'>
                <RoomsCard></RoomsCard>
            </div>
        </div>
    )
}

export default Rooms;