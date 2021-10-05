import React from 'react'
import './Cards.css'

function Cards({ title, imageUrl, body }) {
    return (
        <div className='Hcard-container'>
            <div className='Himage-container'>
                <img src={imageUrl} alt='' />
            </div>
            <div className='Hcard-content'>
                <div className='Hcard-title'>
                    <label className="htopic">{title}</label>
                </div>
                <div className='Hcard-body'>
                    <p className="hpara">{body}</p>
                </div>
            </div>

        </div>
    )
}

export default Cards
