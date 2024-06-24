"use client";
import { useState } from "react";
import "./page.scss";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className={`main ${isOpen ? 'open' : 'closed'}`}>
      <Topbar/>
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      
      <div className="container">
        <section className="row h-25">
          <div className="item w-100">2/3 Width</div>
        </section>
        <section className="row h-75">
          <div className="item w-100">1/3 Width</div>
        </section>
        <section className="row h-25">
          <div className="item w-30">1/3 Width</div>
          <div className="item w-60">2/3 Width</div>
        </section>
      </div>

    </main>
  );
}
