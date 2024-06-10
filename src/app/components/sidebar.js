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
          <h2>Sidebar Content</h2>
          <p>This is the content of the sidebar.</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
