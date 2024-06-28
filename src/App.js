import { useState } from "react";

import './App.scss';
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import CoinChart from "./components/coinChart";
import CoinStats from "./components/coinStats";

function App() {
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

          <div className="item w-100">
            <CoinStats/>
          </div>
        </section>
        <section className="row h-75">
          <div className="item w-100">
            <CoinChart/>
          </div>
        </section>
        <section className="row h-25">
          <div className="item w-30">1/3 Width</div>
          <div className="item w-60">2/3 Width</div>
        </section>
      </div>

    </main>
  );
}


export default App;