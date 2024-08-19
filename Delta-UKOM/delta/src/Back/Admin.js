import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Konten from "./Konten";
import { link } from "../Axios/link";

function Admin() {

  link.interceptors.response.use(
    response => response,  // Return response if successful
    error => {
        if (error.response && error.response.status === 401) {
            // Handle the error only once and redirect to avoid repeated alerts
            if (!window.__hasShownUnauthorizedAlert) {
                window.__hasShownUnauthorizedAlert = true;  // Flag to prevent repeated alerts
                alert('Unauthorized');
                setTimeout(() => {
                    window.location.href = '/market';  // Redirect after alert
                }, 100);  // Small delay to ensure the alert shows first
            }
        }
        return Promise.reject(error);  // Propagate other errors
    }
);

  return (
    <div className="relative min-h-screen">
      <div className="absolute bottom-0 left-0   mb-20">
        <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 p-3">
         
        {sessionStorage.getItem('level') == 1 && (<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Logged in as : Courier
          </h5>)  }
          {sessionStorage.getItem('level') == 2 && (  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Logged in as : Manager
          </h5>) }
          {sessionStorage.getItem('level') == 3 ?  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Logged in as : Admin
          </h5> :null}
        
        
          <p className="font-sm text-gray-700">
            Your E-mail is : {sessionStorage.getItem('email')}
          </p>
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location = "http://localhost:3000/login";
            }}
            className="bg-deepkoamaru  hover:bg-floralwhite hover:text-deepkoamaru text-floralwhite font-bold py-1 px-2 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded "
          >
            Log Out
          </button>
        </div>
      </div>
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
          

            {sessionStorage.getItem('level') == 1 && (<ul className=" flex justify-around"> <li className="list-disc text-white text-xl underline hover:no-underline">
                <Link to="/admin/orders">Orders</Link>
              </li></ul>)  }
            {sessionStorage.getItem('level') == 2 && (<ul className=" flex justify-around"> <li className="list-disc text-white text-xl underline hover:no-underline">
                <Link to="/admin/orders">Orders</Link>
              </li> <li className="list-disc text-white text-xl underline hover:no-underline">
                <Link to="/admin/fish">Fishes</Link>
              </li></ul>)  }
            {sessionStorage.getItem('level') == 3 && (<ul className=" flex justify-around"> <li className="list-disc text-white text-xl underline hover:no-underline">
                <Link to="/admin/orders">Orders</Link>
              </li> <li className="list-disc text-white text-xl underline hover:no-underline">
                <Link to="/admin/fish">Fishes</Link>
              </li><li className="list-disc text-white text-xl underline hover:no-underline">
                <Link to="/admin/users">Users</Link>
              </li></ul>)  }
            

             
             
              
            
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
