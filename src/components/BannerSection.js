import React from 'react';
import '../App.css';
import { Button } from './Button';
import './BannerSection.css';
import { Input } from 'antd';

function BannerSection() {
    return (
        <div className='banner-container'>
            {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
            <h1>FIND BOOK ENJOY</h1>
            <p>What are you waiting for?</p>
            <div className="banner-btns">
                <Input size="large" placeholder="large size"/>
            </div>
        </div>
    )
}

export default BannerSection;
