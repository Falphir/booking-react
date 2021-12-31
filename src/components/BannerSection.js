import React, { useState, useEffect } from 'react';
import '../App.css';
import './BannerSection.css';
import { Input, DatePicker, Button } from 'antd';
import { Link } from 'react-router-dom';


function BannerSection() {
    const { RangePicker } = DatePicker;
    const [descricao, setDescricao] = useState("");


    const handleChange = e => {
        setDescricao(e.target.value);
    };


    return (

        <div className='banner-container'>
            {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
            <h1>FIND BOOK ENJOY</h1>
            <p>What are you waiting for?</p>
            <div className="banner-search">
                <Input className='input' placeholder="Search here..." name="search" onChange={handleChange} />
                {/* <RangePicker className="check-in-out" /> */}
                <Link to={`/rooms/search/${descricao}`}>
                    <Button className='btn-search'>
                        <i class="fas fa-search" aria-hidden="true"></i>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default BannerSection;
