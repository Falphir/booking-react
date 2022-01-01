import './Rooms.css';
import Config from '../../../config';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SearchRoomCard from './SearchRoomsCard';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import MostRecentSearchRoomsCard from './MostRecentSearchRoomsCard';
import LessStarsSearchRoomsCard from './LessStarsSearchRoomsCard';
import MoreStarsSearchRoomsCard from './MoreStarsSearchRoomsCard';
import LowPriceSearchRoomsCard from './LowPriceSearchRoomsCard';
import HighPriceSearchRoomsCard from './HighPriceSearchRoomsCard';


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
                return <HighPriceSearchRoomsCard />; //highest price

            case 2:
                return <LowPriceSearchRoomsCard />; //lowest price

            case 3:
                return <MoreStarsSearchRoomsCard />; //more stars first

            case 4:
                return <LessStarsSearchRoomsCard />; //less stars first

            case 5:
                return <MostRecentSearchRoomsCard />; //most recent

            case 6:
                return <SearchRoomCard />; //most old

            default:
                return <SearchRoomCard />; //most old
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

