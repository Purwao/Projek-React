import React from "react";
import { Link , useResolvedPath } from "react-router-dom";

export default function Side() {
    const url=useResolvedPath("").pathname;
  return (
    <div>
      <div className="d-flex" id="wrapper">
        <div
          className="bg-light border-right card"
          style={{ width: "18rem" }}
          id="sidebar-wrapper"
        >
          <div className="sidebar-heading card-header header"><h4>Sidebar</h4></div>
          <div className="list-group list-group-flush">
            <Link to={`${url}/kategori`}>
              <li className="list-group-item list-group-item-action bg-light">
                Kategori
              </li>
            </Link>
            <Link to={`${url}/menu`}>
              <li className="list-group-item list-group-item-action bg-light">
                Menu
              </li>
            </Link>
            <Link to={`${url}/pelanggan`}>
              <li className="list-group-item list-group-item-action bg-light">
                Pelanggan
              </li>
            </Link>
            <Link to={`${url}/order`}>
              <li className="list-group-item list-group-item-action bg-light">
                Order
              </li>
            </Link>
            <Link to={`${url}/orderdetail`}>
              <li className="list-group-item list-group-item-action bg-light">
                Order Detail
              </li>
            </Link>
            <Link to={`${url}/admin-page`}>
              <li className="list-group-item list-group-item-action bg-light">
                Admin
              </li>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
