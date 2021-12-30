import './Rooms.css';
import Config from '../../../config';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RoomsCard from './RoomsCard';
import { Select } from 'antd';
const { Option } = Select;

const Rooms = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

    //se n tiver configurado o token no config.js, irá diretamente redirecionar para a homepage
    if (!Config.token) {
        return <Navigate to={'/'}></Navigate>
    }

    return (
        <div className='room-container'>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Order by"
                optionFilterProp="children"
            /* filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            } */
            /* filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            } */
            >
                <Option value="1"><i class="fas fa-sort-amount-up"></i> Highest Price</Option>
                <Option value="2"><i class="fas fa-sort-amount-down-alt"></i> Lowest Price</Option>
                <Option value="3"><i class="fas fa-star"></i> Stars (more stars first)</Option>
                <Option value="4"><i class="fas fa-star"></i> Stars (less stars first)</Option>
                <Option value="5"><i class="fas fa-sort-amount-up"></i> Most Recent</Option>
                <Option value="6"><i class="fas fa-sort-amount-down-alt"></i> Most Old</Option>
            </Select>

            <p></p>

            <RoomsCard></RoomsCard>
        </div>
    )
}

export default Rooms;