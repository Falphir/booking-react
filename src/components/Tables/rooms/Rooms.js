import Room from './RoomTable';
import './Rooms.css';
import Config from '../config';
import React, { useState } from 'react';
import RoomsForm from './add/RoomsForm';
import { Navigate } from 'react-router-dom';
import RoomTable from './RoomTable';



const Rooms = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

    //se n tiver configurado o token no config.js, irá diretamente redirecionar para a homepage
    if (!Config.token) {
        return <Navigate to={'/'}></Navigate>
    }


    return (
        <div className='room-container'>
            <RoomTable></RoomTable>
        </div>
    )
}

export default Rooms;