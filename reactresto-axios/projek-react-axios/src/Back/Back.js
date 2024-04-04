import React from "react";
import Nav from "./Nav";
import Side from "./Side";
import Footer from "./Footer";
import Main from "./Main";
import { Navigate, useNavigate } from "react-router-dom";


export default function Back() {
  console.log(sessionStorage.getItem("token"))
const navigate = useNavigate();

if ((sessionStorage.getItem("token") == 'undefined') || (sessionStorage.getItem("token") == null)) {
    navigate("/login");}
return (
    <div>
      <div className="row"><div><Nav /></div></div>
      <div className="row">
        <div className="col-4"><Side/></div>
        <div className="col-8"><Main /></div>
      </div>
      <div className="row"><div><Footer /></div></div>
    </div>
  );


}