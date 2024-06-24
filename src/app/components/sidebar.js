'use client';
import React, { useState } from 'react';
import '../styles/sidebar.scss';

const Sidebar = ({isOpen,toggleSidebar}) => {

  return (
    <>
      <button className={`toggle-button ${isOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          className={`menu-icon ${isOpen ? 'open' : ''}`}
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <section className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <button><img src="https://via.placeholder.com/150"/> {isOpen ? <span>Some Text...</span> : ''}</button>
          <button><img src="https://via.placeholder.com/150"/> {isOpen ? <span>Some Text...</span> : ''}</button>
          <button><img src="https://via.placeholder.com/150"/> {isOpen ? <span>Some Text...</span> : ''}</button>
        </div>

        {isOpen ? 
          <div className='transact'>
            <div className='opts'>
              <button>Buy</button>
              <button>Sell</button>
            </div>
            <div className='pricing'>
              <span>Price At BTC</span>
              <input type="text" placeholder="Price"/>
              <span>Price At BTC</span>
              <input type="text" placeholder="Amount"/>
              <button>Place Order</button>
            </div>
          </div>
        : ''}
      </section>
    </>
  );
};

export default Sidebar;
