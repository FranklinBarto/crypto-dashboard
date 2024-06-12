'use client';
import React, { useState } from 'react';
import '../styles/sidebar.scss';

const Sidebar = ({isOpen,toggleSidebar}) => {

  return (
    <>
      <button className={`toggle-button ${isOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
        HI!
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <button><img src="https://via.placeholder.com/150"/> {isOpen ? <span>Some Text...</span> : ''}</button>
          <button><img src="https://via.placeholder.com/150"/> {isOpen ? <span>Some Text...</span> : ''}</button>
          <button><img src="https://via.placeholder.com/150"/> {isOpen ? <span>Some Text...</span> : ''}</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
