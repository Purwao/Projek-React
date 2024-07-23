import React, { useState } from "react";
// import Art1 from "../photos/Artboard 1.png";
// import Art2 from "../photos/Artboard 2.png";
// import Art3 from "../photos/Artboard 3.png";
import hero1 from "../photos/download (1).jpeg";

import Nav from "../components/Nav";
import Advertisement from "../components/Advertisement";

import Footer from "../components/Footer";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import UseGet from "../Axios/useGet";

function Market() {
  // Search Bar
  const [result, setResult] = useState([]);

  const {
    register: registerFirst,
    handleSubmit: handleSubmitFirst,
  
    reset,
  } = useForm();
  const {
    register: registerSecond,
    handleSubmit: handleSubmitSecond,
 
  } = useForm();

  function search(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("search", data.search);
    console.log(formData);
    link.post("search", formData).then((res) => {
      console.log(res);
      if (res.data !== "") {
        setResult(res.data);
        console.log(result);
        document.getElementById("my_modal_5").showModal();
      } else {
        alert("Data ikan tidak ditemukan.");
      }
      reset();
    });
  }

  // Modal(dialog)

  let count = 1;
  let hargatotal = result.hargaumum;

  function showModal1(id) {
    count = 1;
    document.getElementById("count-display").innerHTML = count;
    document.getElementById("harga-display").innerHTML = result.hargaumum;
    console.log(id);
    link.get("modal/" + id).then((res) => {
      setResult(res.data);
      console.log(result);
      console.log(res);
      document.getElementById("my_modal_1").showModal();
    });
  }

  function upCounter() {
    count += 1;
    hargatotal = result.hargaumum * count;
    // console.log(count);
    document.getElementById("count-display").innerHTML = count;
    document.getElementById("harga-display").innerHTML = hargatotal;
    // console.log(result)
  }

  function downCounter() {
    if (count > 1) {
      count -= 1;
      hargatotal = result.hargaumum * count;
      document.getElementById("count-display").innerHTML = count;
      document.getElementById("harga-display").innerHTML = hargatotal;
    } else {
      count = 1;
      hargatotal = result.hargaumum * count;
      document.getElementById("count-display").innerHTML = count;
      document.getElementById("harga-display").innerHTML = hargatotal;
    }
  }

  function beli(result) {
    let idikan = result.id;
    console.log(idikan);

    const formData = new FormData();
    formData.append("jumlah", count);
    formData.append("harga", hargatotal);
    formData.append("idpelanggan", idpelanggansession);
    formData.append("idikan", idikan);

    link.post("beli", formData).then((res) => {
      console.log(res);
      if (res.data.status === 201) {
        document.getElementById("pembayaran-berhasil").style.display = "flex";
      } else {
      }
    });
  }

  // filtering fishes

  const [filter, setFilter] = useState();

  function searchie(data) {
    const formData = new FormData();
    formData.append("ukuran", data.ukuran);
    formData.append("habitat", data.habitat);
    link.post("search1", formData).then((res) => {
      if (res.data !== "") {
        console.log(res.data);
        setFilter(res.data);
      } else {
        alert("Data ikan tidak ditemukan.");
      }
    });
    console.log(filter);
  }

  //Axioss

  const [isi] = UseGet("/bestseller");

  //SessionStorage

  const idpelanggansession = sessionStorage.getItem("idpelanggan");
  const emailsession = sessionStorage.getItem("email");

  return (
    <div>
      {/* Nav */}

      <Nav></Nav>

      {/* Hero */}

      <div>
        <section className=" bg-white text-black  h-screen flex justify-center items-center px-20">
          <div className="container  text-center flex justify-between items-center">
            <div className=" w-2/4 text-start">
              <h1 className=" md:text-4xl font-bold mb-2 font-GI">
                Welcome to Our Website
              </h1>
              <p className="md:text-md mb-6 font-HSR">
                Temukan ikan yang bersumber lestari, berkualitas tinggi. Baik
                anda mencari hasil tangkapan sempurna untuk hidangan berikutnya
                atau ikan segar untuk restoran, kami siap membantu!
              </p>
              <div>
                <form
                  action=""
                  className="  flex-row justify-between items-center "
                  onSubmit={handleSubmitFirst(search)}
                >
                  <input
                    type="text"
                    name=""
                    id=""
                    className=" "
                    placeholder="⌕ 
                  Search..."
                    {...registerFirst("search", { required: true })}
                  />
                  <button
                    type="submit"
                    className="bg-deepkoamaru  hover:bg-floralwhite hover:text-black text-floralwhite font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded  "
                  >
                    Submit
                  </button>
                </form>
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle  py-10 rounded-3xl"
                >
                  <div className="modal-box ">
                    <div className="">
                      <div className="flex flex-row justify-center items-center ">
                        <h1 className="text-4xl text-deepkoamaru font-GI font-bold pb-10 ">
                          Hasil Pencarian Ikan
                        </h1>
                      </div>

                      <div className="flex flex-row items-center px-20">
                        <div className=" pe-10">
                          <img
                            src={result.gambar}
                            alt=""
                            className=" w-56 rounded-3xl"
                          />
                        </div>
                        <div className="flex flex-col items-center ">
                          <h1 className="mb-2 text-4xl font-bold tracking-tight text-deepkoamaru">
                            {result.ikan}
                          </h1>
                          <p className="font-normal text-deepkoamaru text-2xl">
                            Rp. {result.hargaumum}/Kg
                          </p>
                          <p className="mb-7 font-extralight text-deepkoamaru text-lg">
                            Ditangkap di {result.habitat}
                          </p>
                        </div>
                      </div>

                      <div className="modal-action">
                        <div className="flex flex-row-reverse justify-between px-44 mt-10">
                          <button
                            onClick={() => {
                              showModal1(result.id);
                              document.getElementById(
                                "pembayaran-berhasil"
                              ).style.display = "none";
                              document.getElementById(
                                "pembayaran-gagal"
                              ).style.display = "none";
                            }}
                            className="inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                          >
                            Beli
                          </button>

                          <form method="dialog">
                            <button className="btn inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-red-500 text-floralwhite hover:bg-floralwhite hover:text-red-500 hover:border-red-500 border-2 transition duration-300 ease-linear rounded-lg ">
                              Kembali
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
            <div>
              <img src={hero1} width={450} alt="" />
            </div>
          </div>
        </section>
        <dialog
          id="my_modal_1"
          className="modal modal-bottom sm:modal-middle bg-floralwhite  py-10 rounded-3xl"
        >
          <div className="modal-box">
            <div className="">
              <div className="flex flex-row justify-center items-center ">
                <h1 className="text-4xl text-deepkoamaru font-GI font-bold pb-10 ">
                  Beli Ikan ?
                </h1>
              </div>

              <div className="flex flex-row items-center px-20">
                <div className=" pe-10">
                  <img src={result.gambar} alt="" className=" w-96" />
                </div>
                <div className="flex flex-col items-center ">
                  <h1 className="mb-2 text-4xl font-bold tracking-tight text-deepkoamaru">
                    {result.ikan}
                  </h1>
                  <p className="font-normal text-deepkoamaru text-2xl">
                    Rp. {result.hargaumum}/Kg
                  </p>
                  <p className="mb-7 font-extralight text-deepkoamaru text-lg">
                    Ditangkap di {result.habitat}
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-between px-20 mt-5">
                <div>
                  <span className="flex flex-row ">
                    <h1 className="mb-2 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR">
                      Total harga:{" "}
                    </h1>
                    <small className="px-2 mb-2 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR">
                      {" "}
                      Rp.{" "}
                    </small>
                    <br />
                    <h1
                      className="mb-2 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR"
                      id="harga-display"
                    >
                      {hargatotal}
                    </h1>
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="inline-flex items-center px-3 py-2 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                    onClick={downCounter}
                  >
                    -
                  </button>
                  <h1
                    id="count-display"
                    className="mb-2 px-4 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR"
                  >
                    {count}
                  </h1>
                  <button
                    className="inline-flex items-center px-3 py-2 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                    onClick={upCounter}
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                id="pembayaran-berhasil"
                className=" mt-5 w-96 mx-auto h-12 bg-cornflower rounded-lg flex flex-row items-center justify-center "
              >
                <svg
                  className="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="#2662fb"
                >
                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
                </svg>
                <h1 className="ms-2 text-deepkoamaru">Order sudah dibuat</h1>
              </div>
              <div
                id="pembayaran-gagal"
                className=" mt-5 w-96 mx-auto h-12 bg-cornflower rounded-lg flex flex-row items-center justify-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#2662fb"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.83 0-1.5.67-1.5 1.5S11.17 20 12 20s1.5-.67 1.5-1.5S12.83 17 12 17zm1.07-11.25L12.5 14h-1l-.57-8.25h2.14z" />
                </svg>
                <h1 className="ms-2 text-deepkoamaru">Kesalahan Order</h1>
              </div>
              <div className="modal-action">
                <div className="flex flex-row-reverse justify-between px-44 mt-5">
                  <button
                    onClick={() => {
                      beli(result);
                    }}
                    className="inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                  >
                    Beli
                  </button>

                  <form method="dialog">
                    <button className="btn inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-red-500 text-floralwhite hover:bg-floralwhite hover:text-red-500 hover:border-red-500 border-2 transition duration-300 ease-linear rounded-lg ">
                      Kembali
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      {/* Advertisement*/}

      <Advertisement></Advertisement>

      {/* Best Seller */}
      <div>
        <div className="bg-white w-screen h-screen flex flex-row justify-between px-20">
          <div className="w-3/6  flex flex-col justify-center ">
            <h1 className="text-black text-3xl font-GI font-semibold p-2">
            | Customers Favorite - The Bestsellers
            </h1>
            <p className="text-sm mb-6 ms-2 font-medium font-HSR">
              Jelajahi ikan terpopuler kami, yang dipilih oleh pelanggan kami
              karena kualitas dan rasanya yang luar biasa. Dari salmon segar
              hingga tuna yang lezat, produk terlaris ini pasti menyenangkan.
              Cobalah hari ini!
            </p>
          </div>
          <div
            className="ms-20 flex flex-row items-center w-5/6 overflow-x-auto rounded-md"
            id="wrapper"
          >
            {isi.map((value, index) => (
              <div
                className=" bg-deepkoamaru border mx-10 rounded-lg shadow min-h-48 w-72"
                id="wrapper-item"
              >
                <img
                  className=" min-w-64 rounded-b-lg"
                  src={value.gambar}
                  alt="..."
                />
                <div className="p-5">
                  <div
                    className="flex justify-between items-center
                "
                  >
                    <small className=" font-extralight text-white text-md">
                      Kategori: {value.habitat}
                    </small>

                    <p className=" font-normal text-white text-md">
                      Rp. {value.hargaumum}/Kg
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <h5 className=" text-4xl font-bold tracking-tight text-white">
                      {value.ikan}
                    </h5>
                    <br />
                    <button
                      onClick={() => {
                        showModal1(value.id);
                        document.getElementById(
                          "pembayaran-berhasil"
                        ).style.display = "none";
                        document.getElementById(
                          "pembayaran-gagal"
                        ).style.display = "none";
                      }}
                      className="inline-flex items-center px-5 py-1 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                    >
                      Beli
                    </button>
                  </div>
                </div>
                <dialog
                  id="my_modal_4"
                  className="modal modal-bottom sm:modal-middle bg-floralwhite  py-10 rounded-3xl"
                >
                  <div className="modal-box">
                    <div className="">
                      <div className="flex flex-row justify-center items-center ">
                        <h1 className="text-4xl text-deepkoamaru font-GI font-bold pb-10 ">
                          Beli Ikan ?
                        </h1>
                      </div>

                      <div className="flex flex-row items-center px-20">
                        <div className=" pe-10">
                          <img src={result.gambar} alt="" className=" w-96" />
                        </div>
                        <div className="flex flex-col items-center ">
                          <h1 className="mb-2 text-4xl font-bold tracking-tight text-deepkoamaru">
                            {result.ikan}
                          </h1>
                          <p className="font-normal text-deepkoamaru text-2xl">
                            Rp. {result.hargaumum}/Kg
                          </p>
                          <p className="mb-7 font-extralight text-deepkoamaru text-lg">
                            Ditangkap di {result.habitat}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between px-20 mt-5">
                        <div>
                          <span className="flex flex-row ">
                            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR">
                              Total harga:{" "}
                            </h1>
                            <small className="px-2 mb-2 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR">
                              {" "}
                              Rp.{" "}
                            </small>
                            <br />
                            <h1
                              className="mb-2 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR"
                              id="harga-display"
                            >
                              {hargatotal}
                            </h1>
                          </span>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <button
                            className="inline-flex items-center px-3 py-2 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                            onClick={downCounter}
                          >
                            -
                          </button>
                          <h1
                            id="count-display"
                            className="mb-2 px-4 text-2xl font-semibold tracking-tight text-deepkoamaru font-HSR"
                          >
                            {count}
                          </h1>
                          <button
                            className="inline-flex items-center px-3 py-2 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                            onClick={upCounter}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div
                        id="pembayaran-berhasil"
                        className=" mt-5 w-96 mx-auto h-12 bg-cornflower rounded-lg flex flex-row items-center justify-center "
                      >
                        <svg
                          className="w-10 h-10"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                          fill="#2662fb"
                        >
                          <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
                        </svg>
                        <h1 className="ms-2 text-deepkoamaru">
                          Order sudah dibuat
                        </h1>
                      </div>
                      <div
                        id="pembayaran-gagal"
                        className=" mt-5 w-96 mx-auto h-12 bg-cornflower rounded-lg flex flex-row items-center justify-center "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="#2662fb"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.83 0-1.5.67-1.5 1.5S11.17 20 12 20s1.5-.67 1.5-1.5S12.83 17 12 17zm1.07-11.25L12.5 14h-1l-.57-8.25h2.14z" />
                        </svg>
                        <h1 className="ms-2 text-deepkoamaru">
                          Kesalahan Order
                        </h1>
                      </div>
                      <div className="modal-action">
                        <div className="flex flex-row-reverse justify-between px-44 mt-5">
                          <button
                            onClick={() => {
                              beli(result);
                            }}
                            className="inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                          >
                            Beli
                          </button>

                          <form method="dialog">
                            <button className="btn inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-red-500 text-floralwhite hover:bg-floralwhite hover:text-red-500 hover:border-red-500 border-2 transition duration-300 ease-linear rounded-lg ">
                              Kembali
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* List Of Fishes */}
      {/* <Fisheslist></Fisheslist> */}
      <div>
        <div className="bg-deepkoamaru bgiwak bg-contain w-screen h-screen flex flex-row justify-around gap-4 items-center px-20">
          <div className="">
            <form
              action=" "
              className="text-sm"
              onSubmit={handleSubmitSecond(searchie)}
            >
              <div className="flex-col ">
                <div>
                  <label className="block m-2 text-md font-medium text-floralwhite">
                    Ukuran Ikan:
                    <select
                      {...registerSecond("ukuran", { required: true })}
                      id="ukuran"
                      name="ukuran"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-32 p-2 "
                    >
                      <option value="">Pilih ukuran</option>
                      <option value="20">Kecil</option>
                      <option value="50">Sedang</option>
                      <option value="100">Besar</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="block m-2 text-md font-medium text-floralwhite ">
                    Habitat:
                    <select
                      id="habitat"
                      {...registerSecond("habitat", { required: true })}
                      name="habitat"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-32 p-2 "
                    >
                      <option value="">Pilih habitat</option>
                      <option value="Air Tawar">Air Tawar</option>
                      <option value="Air Laut">Air Laut</option>
                      <option value="Air Asin">Air Asin</option>
                    </select>
                  </label>
                </div>
                <div>
                  <button
                    className="block w-32 p-2 text-sm ms-2  bg-floralwhite text-deepkomaru hover:bg-deepkoamaru hover:text-floralwhite hover:border-deepkoamaru  transition duration-300 ease-linear rounded "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className=" h-4/6 w-10/12 bg-herowhite flex justify-center items-center">
            {!filter ? (
              <div className="w-4/6  ">
                <h1 className="text-4xl  font-bold mb-2 font-GI">
                  Explore Our Fish Categories
                </h1>
                <p className="text-md mb-6 font-HSR">
                  Telusuri beragam kategori kami untuk menemukan ikan yang
                  sempurna untuk kebutuhan Anda. Baik Anda mencari ikan hasil
                  tangkapan liar, hasil budidaya, atau jenis ikan tertentu
                  seperti salmon, tuna, atau kerang, kami memiliki semuanya.
                </p>
              </div>
            ) : (
              <div className="w-full h-full grid grid-cols-4 py-3 overflow-x-hidden overflow-y-auto ">
                {filter.map((value, index) => (
                  <div
                    className=" bg-deepkoamaru border mx-2 mb-2 rounded-lg shadow h-44 w-52 "
                    id="wrapper-item"
                  >
                    <img
                      className=" mx-auto  max-h-16 rounded-b-lg "
                      src={value.gambar}
                      alt="..."
                    />
                    <div className="p-2">
                      <div className="flex justify-between items-center">
                        <small className=" font-extralight text-white text-sm">
                          Kategori: {value.habitat}
                        </small>

                        <p className=" font-normal text-white text-sm">
                          Rp. {value.hargaumum}/Kg
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <h5 className=" text-2xl font-bold tracking-tight text-white">
                          {value.ikan}
                        </h5>
                        <br />
                        <button
                          onClick={() => {
                            showModal1(value.id);
                            document.getElementById(
                              "pembayaran-berhasil"
                            ).style.display = "none";
                            document.getElementById(
                              "pembayaran-gagal"
                            ).style.display = "none";
                          }}
                          className="inline-flex items-center px-4 py-1 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default Market;
