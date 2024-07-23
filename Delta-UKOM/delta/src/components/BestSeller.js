import React, { useState } from "react";
import UseGet from "../Axios/useGet";
import { link } from "../Axios/link";

function BestSeller() {

  const [result, setResult] = useState([]);

  let count = 1;
  let hargatotal = result.hargaumum;

  function showModal4(id) {
    count = 1;
    document.getElementById("count-display").innerHTML = count;
    document.getElementById("harga-display").innerHTML = result.hargaumum;
    console.log(id);
    link.get("modal/" + id).then((res) => {
      setResult(res.data);
      document.getElementById("my_modal_4").showModal();
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

  //Axioss

  const [isi] = UseGet("/bestseller");

  console.log(isi);

  //SessionStorage

  const idpelanggansession = sessionStorage.getItem("idpelanggan");

  return (
    <div>
      {" "}
      <div className="  bg-white w-screen h-screen flex flex-row justify-between px-40">
        <div className="w-3/6  flex flex-col justify-center items-center">
          <h1 className="text-black text-4xl md:text-5xl font-GI font-semibold p-2">
            Customer Favorites - Our Bestsellers
          </h1>
          <p className="text-lg md:text-xl mb-6 font-HSR">
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
              className=" bg-deepkoamaru border ms-20 rounded-lg shadow min-h-48 min-w-96"
              id="wrapper-item"
            >
              <img
                className=" min-w-96 max-h-72 rounded-b-lg"
                src={value.gambar}
                alt="..."
              />
              <div className="p-5">
                <div className="flex justify-between items-center
                "><small className=" font-extralight text-white text-lg">
                  Kategori: {value.habitat}
                </small>
                
                <p className=" font-normal text-white text-2xl">
                  Rp. {value.hargaumum}/Kg
                </p>
                </div>
                <div className="flex justify-evenly items-center mt-4">
                  <h5 className=" text-4xl font-bold tracking-tight text-white">
                  {value.ikan}
                </h5>
                <br />
                <button
                  onClick={() => {
                    showModal4(value.id);
                    document.getElementById(
                      "pembayaran-berhasil"
                    ).style.display = "none";
                    document.getElementById("pembayaran-gagal").style.display =
                      "none";
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
