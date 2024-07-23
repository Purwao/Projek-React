import React from "react";

import cart from "../photos/cart.svg";





function Nav() {

  const emailsession = sessionStorage.getItem("email");
  return (
    <div>
        <div className=" ">
        <nav className="navbar bg-white navbar-expand-lg navbar-light fixed w-screen z-50 ">
          <div className="h-16 flex flex-row justify-between items-center relative px-10">
            <h1>
              <a
                className=" font-fishy ps-10 text-5xl text-deepkoamaru"
                href="market"
              >
                DELTA
              </a>
            </h1>

            {emailsession ? (
              <div className="flex flex-row justify-center items-center">
                <a
                  href="/cart"
                  className="kecil ease-in-out transition duration-400"
                >
                  <div className="flex flex-col me-10 ">
                    <div className="flex flex-row gap-2 justify-center items-center">
                    <i className="mx-auto">
                      <img src={cart} alt="" className="" width={30} />
                    </i>
                      <h1 className=" underline hover:no-underline  text-deepkoamaru font-serif font-light text-md ">
                        {sessionStorage.getItem("email")}
                      </h1>
                    </div>
                  </div>
                </a>
                <button
                  type="submit"
                  className="bg-deepkoamaru  hover:bg-floralwhite hover:text-deepkoamaru text-floralwhite font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded  "
                >
                     <i
                    onClick={() => {
                      sessionStorage.clear();
                      window.location = "http://localhost:3000/login";
                    }}
                  >
                    Logout
                  </i>
                </button>
               
              </div>
            ) : null}
            {!emailsession ? (
              <div className="flex flex-row justify-center items-center ">
                <a href="/cart" className="pe-10">
                  <img src={cart} alt="" className="" width={20} />
                </a>
                <a href="/login">
                  <button className=" bg-deepkoamaru  hover:bg-floralwhite hover:text-deepkoamaru text-floralwhite font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded ">
                    Login
                  </button>
                </a>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Nav