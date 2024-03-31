import React from "react";
import Nav from "./Nav";
import Side from "./Side";
import Footer from "./Footer";
import Main from "./Main";

export default function Front() {
  return (
    <div>
      <div className="row"><div><Nav /></div></div>
      <div className="row">
        <div className="col-2"><Side/></div>
        <div className="col-10"><Main /></div>
      </div>
      <div className="row"><div><Footer /></div></div>
    </div>
  );
}
