import React from "react";
import { Link , useResolvedPath } from "react-router-dom";

export default function Side() {
    const url=useResolvedPath("").pathname;
  return (
    <div>
      <div className="d-flex mt-4" id="wrapper">
        <div
          className="bg-light border-right card"
          style={{ width: "18rem" }}
          id="sidebar-wrapper"
        >
          <div className="sidebar-heading card-header header"><h4>Sidebar</h4></div>
          <div className="list-group list-group-flush">

            <Link to={`${url}/kategori`}>
            {
                            ( sessionStorage.getItem('level') == 'admin' ) ? 
                            (<li className="list-group-item list-group-item-action bg-light">Panel Kategori</li>) : 
                            ""
                        }
            </Link>

            <Link to={`${url}/menu`}>
            {
                            ( sessionStorage.getItem('level') == 'admin' ) ? 
                            (<li className="list-group-item list-group-item-action bg-light">Panel Menu</li>) : 
                            ""
                        }
            </Link>

            <Link to={`${url}/pelanggan`}>
            {
                            ( sessionStorage.getItem('level') == 'admin' ) ? 
                            (<li className="list-group-item list-group-item-action bg-light">Panel pelanggan</li>) : 
                            ""
                        }
            </Link>

            <Link to={`${url}/order`}>
            {
                            ( sessionStorage.getItem('level') == 'admin'|| sessionStorage.getItem('level')=='kasir') ? 
                            (<li className="list-group-item list-group-item-action bg-light">Panel Order</li>) : 
                            ""
                        }
            </Link>

            <Link to={`${url}/orderdetail`}>
            {
                            ( sessionStorage.getItem('level') == 'admin' ||  sessionStorage.getItem('level') == 'koki' || sessionStorage.getItem('level')=='kasir' ) ? 
                            (<li className="list-group-item list-group-item-action bg-light">Panel Order Detail</li>) : 
                            ""
                        }
            </Link>

            <Link to={`${url}/user-admin`}>
            {
                            ( sessionStorage.getItem('level') == 'admin' ) ? 
                            (<li className="list-group-item list-group-item-action bg-light">Panel Pengguna</li>) : 
                            ""
                        }
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
