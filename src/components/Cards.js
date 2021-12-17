import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards () {
  return (
    <div className='cards'>
      <h1>Check out these Rooms!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
          <CardItem
              src='images/room.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              preco='80€ p/pessoa'
              path='/sign-up'
            />
            <CardItem
              src='images/room1.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              preco='90€ p/pessoa'
              path='/services'
            />
            <CardItem
              src='images/room2.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              preco='150€ p/pessoa'
              path='/products'
            />
            <CardItem
              src='images/room3.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              preco='40€ p/pessoa'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;