import logo from "./logo.svg";
import Nav from "./Front/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Front from "./Front/Front";
import Back from "./Back/Back";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container text-center">
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Front} />
        <Route path="/admin/*" Component={Back}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;