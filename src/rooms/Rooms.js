import Room from './Room';
import './Rooms.css';
import Config from '../config';
import { useEffect, useState } from 'react';


const Rooms = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        fetch('/hotel/rooms', {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

            .then((response) => response.json())

            .then((response) => {
                setLoading(false);
                setRooms(response)
            });

        return () => setRooms([]);

    }, [])


    if (loading) {
        return <h1>LOADING</h1>
    }


    return (
        <div className='rooms'>
            <label>ROOMS: </label>
            <ul>{rooms.map((room) => <Room key={room._id} {...room}></Room>)}</ul>
        </div>
    )
}

export default Rooms;