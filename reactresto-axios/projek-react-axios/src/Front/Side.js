import React from "react";

export default function Side() {
  return (
    <div>
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">My Sidebar</div>
          <div className="list-group list-group-flush">
            <li className="list-group-item list-group-item-action bg-light">
              Home
            </li>
            <li className="list-group-item list-group-item-action bg-light">
              About
            </li>
            <li className="list-group-item list-group-item-action bg-light">
              Contact
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
