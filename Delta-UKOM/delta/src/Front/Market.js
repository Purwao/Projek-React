import React, { useState } from "react";
import Art1 from "../photos/Artboard 1.png";
import Art2 from "../photos/Artboard 2.png";
import Art3 from "../photos/Artboard 3.png";
import UseGet from "../Axios/useGet";
import Carousel from "../components/Carousel";

function Market() {
  // Carousels

  let adv1 = Art1;
  let adv2 = Art2;
  let adv3 = Art3;

  //Axioss

  const [isi] = UseGet("/bestseller");
  const [all] = UseGet("/fish")
  console.log(isi);

  //SessionStorage

  const emailsession=sessionStorage.getItem('email');

  return (
    <div>
      {/* Nav */}
      <div className="heading relative">
        <div></div>
        <nav className="navbar bg-deepkoamaru  navbar-expand-lg navbar-light relative">
          <div className="h-28 flex flex-row justify-between items-center relative z-10 ps-10">
            <h1>
              <a
                className="font-serif font-medium text-7xl text-floralwhite"
                href="LandingPage"
              >
                Delta
              </a>
            </h1>
            <form
              action=""
              className="  flex-row justify-between items-center "
            >
              <input
                type="text"
                name=""
                id=""
                className="me-2"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="font-serif px-5 py-2 bg-floralwhite text-deepkoamaru rounded-full hover:bg-deepkoamaru hover:text-floralwhite transition duration-300 ease-in hover:border-floralwhite hover:border-2 "
              >
                Submit
              </button>
            </form>

            {/* Pengecekan jika ada email session */}
            {emailsession?(<div className="flex flex-row">
              <h1 className="text-floralwhite font-serif font-light ">Logged in as: </h1><h1 className=" border-b-2 text-floralwhite font-serif font-light ">{sessionStorage.getItem("email")}</h1>
            </div> ):null}
            {emailsession?( <button className="font-serif h-28 w-28 bg-floralwhite text-deepkoamaru text-xl hover:bg-deepkoamaru hover:text-floralwhite transition duration-300 ease-in hover:border-floralwhite hover:border-2 ">
                <i onClick={()=>{sessionStorage.removeItem('email')}}>Logout</i>
              </button> ):null}
            {!emailsession?( <div>
              <button className="font-serif h-28 w-28 bg-floralwhite text-deepkoamaru text-xl hover:bg-deepkoamaru hover:text-floralwhite transition duration-300 ease-in hover:border-floralwhite hover:border-2 ">
                <a href="/login"> Login</a>
              </button>
            </div>):null}

          </div>
        </nav>
        <div></div>
      </div>

      {/* Advertisement */}
      <div classname="w-scree bg-floralwhite ">
        <div className=" m-20 h-2/3 flex flex-row justify-center items-center ">
          <div className="w-2/6">
            <Carousel></Carousel>
          </div>
          <div className=" w-4/5 flex flex-col justify-center items-center m-5">
            <h1 className=" text-deepkoamaru text-7xl font-serif font-medium">
              Current Discount
            </h1>
            <p className="text-deepkoamaru text-2xl font-light">
              Temukan ikan segar nan murah, hanya di website kami !
            </p>
          </div>
        </div>
      </div>

      {/* Best Seller */}
      <div className="  bg-cornflower w-screen h-screen flex flex-row justify-between p-16">
        <div className="w-2/6  flex flex-col justify-center items-center">
          <h1 className="text-deepkoamaru text-7xl font-serif font-medium">
            Banyak diminati
          </h1>
          <p className="text-deepkoamaru text-2xl font-extralight">
            Barang-barang yang banyak diminati dan dibeli dalam jangka waktu 30
            hari.
          </p>
        </div>
        <div
          className="ms-20 flex flex-row items-center w-5/6 overflow-x-auto rounded-md"
          id="wrapper"
        >
          {isi.map((value, index) => (
            <div
              className=" bg-floralwhite border ms-20 border-gray-200 rounded-lg shadow  min-w-96 min-h-96"
              id="wrapper-item"
            >
              <img className=" min-w-96" src={value.gambar} alt="..." />
              <div className="p-5">
                <h5 className="mb-2 text-7xl font-bold tracking-tight text-deepkoamaru">
                  {value.ikan}
                </h5>
                <p className=" font-normal text-deepkoamaru text-3xl">
                  Rp. {value.hargaumum}/Kg
                </p>
                <small className="mb-7 font-extralight text-deepkoamaru text-lg">
                  Ditangkap di {value.habitat}
                </small>
                <br />
                <button className="inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg ">
                  Beli
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List Of Fishes */}
      <div className="bg-floralwhite w-screen h-screen flex flex-row-reverse  p-16 ">
        <div className="w-2/6 my-auto ">
          <div className=" text-end">
            <h1 className="text-deepkoamaru text-7xl font-sans font-bold">
              Cari Ikanmu!
            </h1>
            <p className="text-deepkoamaru text-xl font-extralight">
              Dengan mengisi data ikan yang kamu cari dibawah ini
            </p>
          </div>
          <div className="mt-10 ">
            <form className="">
              <label
                htmlFor="underline_select"
                className=" border-s-4 border-black ps-2"
              >
                Ukuran Ikan
              </label>
              <select
                id="underline_select"
                className="block mt-3 mb-7 py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-black border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected value="20">
                  1-20 Cm
                </option>
                <option value="50">21-50 Cm</option>
                <option value="100">51++ Cm</option>
              </select>

              <label
                htmlFor="habitat"
                className=" border-s-4 border-black ps-2 mt-7"
              >
                Lingkungan Hidup
              </label>
              <select
                className="block mt-3 mb-7 py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-black border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                id="habitat"
              >
                <option selected>Air Laut</option>
                <option value>Air Tawar</option>
                <option value>Tambak</option>
                <option value>Terumbu Karang</option>
              </select>
              <button
                type="submit"
                className="font-serif px-5 py-2 bg-deepkoamaru text-floralwhite rounded-full hover:bg-floralwhite hover:text-deepkoamaru transition duration-300 ease-in hover:border-deepkoamaru hover:border-2 "
              >
                Cari
              </button>
            </form>
          </div>
        </div>
        <div className="w-4/6 me-10 overflow-auto grid grid-cols-3 gap-4">
          {all.map((value,index)=>( <div
              className=" bg-cornflower border border-gray-200 rounded-lg shadow bg-contain p-3"
              id="wrapper-item"
            >
              <img className="w-36 mx-auto my-auto" src={value.gambar} alt="..." />
              <div className="p-5">
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-deepkoamaru">
                  {value.ikan}
                </h5>
                <p className=" font-normal text-deepkoamaru text-xl">
                  Rp. {value.hargaumum}/Kg
                </p>
                <small className="mb-7 font-extralight text-deepkoamaru text-sm">
                  Ditangkap di {value.habitat}
                </small>
                <br />
                <button className="inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg ">
                  Beli
                </button>
              </div>
            </div>))}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-8  bg-deepkoamaru w-full left-0 right-0 bottom-0">
        <div className=" max-w-screen-xl mx-auto">
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="text-sm text-floralwhite flex justify-between  ">
            <span className="">&copy; Society.co </span>
            <span> All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Market;
