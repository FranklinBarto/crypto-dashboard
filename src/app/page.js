"use client";
import { useState } from "react";
import Image from "next/image";
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
        <section className="row">
          <div className="item full-width">2/3 Width</div>
        </section>
        <section className="row">
          <div className="item one-third">1/3 Width</div>
          <div className="item two-thirds">2/3 Width</div>
        </section>
        <section className="row">
          <div className="item one-third">1/3 Width</div>
          <div className="item two-thirds">2/3 Width</div>
        </section>
      </div>

    </main>
  );
}
