import React from 'react';
import '../App.css';
import './BannerSection.css';
import { Input, DatePicker, Button} from 'antd';


function BannerSection() {
    const { RangePicker } = DatePicker;

    return (
        
        <div className='banner-container'>
            {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
            <h1>FIND BOOK ENJOY</h1>
            <p>What are you waiting for?</p>
            <div className="banner-search">
                <Input  className='input' placeholder="Pesquise aqui..."/>
                <RangePicker  className="check-in-out"/>
                <Button className='btn-search'>Search</Button>
            </div>
        </div>
    )
}

export default BannerSection;
