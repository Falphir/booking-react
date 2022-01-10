import React from 'react'
import FavoritesForm from '../Tables/favorites/add/FavoritesForm'
import '../../App.css'

function addFavorite() {
    return (
        <>
            <div className='reserve-banner-container'>
                <div className='reserveForm'>
                    <FavoritesForm />
                </div>
            </div>
        </>
    )
}

export default addFavorite