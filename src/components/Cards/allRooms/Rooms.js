import './Rooms.css';
import Config from '../../../config';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RoomsCard from './RoomsCard';


const Rooms = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

    //se n tiver configurado o token no config.js, irá diretamente redirecionar para a homepage
    if (!Config.token) {
        return <Navigate to={'/'}></Navigate>
    }

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