import './Rooms.css';
import Config from '../../../config';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RoomsCard from './RoomsCard';
import LowPriceRoomsCard from './LowPriceRoomsCard';
import HighPriceRoomsCard from './HighPriceRoomsCard';
import MoreStarsRoomsCard from './MoreStarsRoomsCard';
import LessStarsRoomsCard from './LessStarsRoomsCard';
import MostRecentRoomsCard from './MostRecentRoomsCard';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';


const Rooms = () => {
    const [active, setActive] = useState(true);
    const SetView = (active) => {
        setActive(active);
    };


    //se n tiver configurado o token no config.js, irá diretamente redirecionar para a homepage
    if (!Config.token) {
        return <Navigate to={'/'}></Navigate>
    }



    const ActiveView = () => {
        switch (active) {
            case 1:
                return <HighPriceRoomsCard />; //highest price

            case 2:
                return <LowPriceRoomsCard />; //lowest price

            case 3:
                return <MoreStarsRoomsCard />; //more stars first

            case 4:
                return <LessStarsRoomsCard />; //less stars first

            case 5:
                return <MostRecentRoomsCard />; //most recent

            case 6:
                return <RoomsCard />; //most old

            default:
                return <RoomsCard />; //most old
        }
    };


    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => SetView(1)}>
                <i class="fas fa-sort-amount-up"></i> Highest Price
            </Menu.Item>
            <Menu.Item key="2" onClick={() => SetView(2)}>
                <i class="fas fa-sort-amount-down-alt"></i> Lowest Price
            </Menu.Item>
            <Menu.Item key="3" onClick={() => SetView(3)}>
                <i class="fas fa-star"></i> Stars (more stars first)
            </Menu.Item>
            <Menu.Item key="4" onClick={() => SetView(4)}>
                <i class="fas fa-star"></i> Stars (less stars first)
            </Menu.Item>
            <Menu.Item key="5" onClick={() => SetView(5)}>
                <i class="fas fa-sort-amount-up"></i> Most Recent
            </Menu.Item>
            <Menu.Item key="6" onClick={() => SetView(6)}>
                <i class="fas fa-sort-amount-down-alt"></i> Most Old
            </Menu.Item>
        </Menu>
    );



    return (
        <div className='room-container'>
            <Dropdown overlay={menu}>
                <Button> Order by <DownOutlined /></Button>
            </Dropdown>

            <p></p>

            {ActiveView()}
        </div>
    )
}

export default Rooms;