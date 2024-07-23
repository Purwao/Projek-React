import React from "react";
import Ikan from "./Ikan";
import {BrowserRouter,Routes,Route , Link } from 'react-router-dom';
import Konten from "./Konten";



function Admin() {
  return (
    <div>
    <div className="">
      <nav className="navbar bg-deepkoamaru flex justify-between items-center px-10 navbar-expand-lg navbar-light relative">
        <div className="h-16 flex flex-row justify-between items-center z-10">
          <h1>
            <a
              className="font-fishy text-6xl text-floralwhite"
              href="LandingPage"
            >
              DeltAdmin
            </a>
          </h1>
        </div>

        <div className="w-1/3">
          <ul className=" flex justify-around">
            <li className="list-disc text-white text-xl underline hover:no-underline">
              <Link to="/admin/fish">Fishes</Link>
            </li>
            <li className="list-disc text-white text-xl underline hover:no-underline">
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li className="list-disc text-white text-xl underline hover:no-underline">
              <Link to="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div className="content ">
      <Routes>
        <Route path=":konten" Component={Konten} />
      </Routes>
    </div>
  </div>
  );
}

export default Admin;
