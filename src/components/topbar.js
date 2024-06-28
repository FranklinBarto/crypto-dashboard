import React from 'react';
import '../styles/topbar.scss';

import settingsIcon from '../assets/settings-outline.png';
import chatIcon from '../assets/chat-outline.png';
const Topbar = () => {
    return (
        <div className='topbar'>
            <div className='user'>
                <button>
                    <span>3</span>
                </button>
                <div className='text'>
                    <h3>Good Morning User!</h3>
                    <span>Today we are seeing a global shift in the markets</span>
                </div>
            </div>    
            <div className='icons'>
                <button><img src={chatIcon} alt='icon'/></button>
                <button><img src={settingsIcon} alt='icon'/></button>
            </div>    
        </div>
    );
}

export default Topbar;
