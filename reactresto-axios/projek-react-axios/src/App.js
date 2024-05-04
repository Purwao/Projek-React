import logo from "./logo.svg";
import Nav from "./Front/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Front from "./Front/Front";
import Login from "./Back/Login";
import Back from "./Back/Back";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Back/Menu";

function App() {
  return (
    <div className="container text-justify">
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" Component={Front} />
        <Route path="/admin/*" Component={Back}/>
        <Route path="/login" Component={Login}></Route> */}
        <Route path="/menu" Component={Menu}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
