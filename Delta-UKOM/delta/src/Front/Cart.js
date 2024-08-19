import React, { useState } from "react";


import Nav from "../components/Nav";
import kranjang from "../photos/cart.png";
import { link } from "../Axios/link";
import UseGet from "../Axios/useGet";

function Cart() {
  const idpelanggansession = sessionStorage.getItem("idpelanggan");
  const emailsession = sessionStorage.getItem("email");

  const [seeSaldo] = UseGet(`/customer/${idpelanggansession}`);
  const [saldo, setSaldo] = useState(0);
  const [cart] = UseGet(`/cart/${idpelanggansession}`);
  let currentSaldo = seeSaldo.saldo;
  console.log(cart);

  function modalTopup() {
    document.getElementById("my_modal_2").showModal();
  }
  function modalTopupValue(event) {
    setSaldo(event.target.value);
  }
  function topUp() {
    const formData = new FormData();
    formData.append("saldo", saldo);
    console.log(saldo);
    link.post(`topup/${idpelanggansession}`, formData).then((res) => {
      console.log(res);
      document.getElementById("topup-berhasil").style.display = "flex";
    });
  }
  function destroy(id) {
    link.delete(`cart/${id}`).then((res) => {
      console.log(res);
    });
  }
  function buy(id) {
    const formData = new FormData();
    formData.append("idpelanggan", idpelanggansession);
    link.post(`beli/${id}`, formData).then((res) => {
      console.log(res);
      
    }).catch(error => {
      if (error.response) {
          if (error.response.status === 403) {
              alert('Akun anda di Banned');
          } else if (error.response.status === 401) {
              alert('Password Salah');
          } else if (error.response.status === 404) {
              alert('Customer not found');
          } else if (error.response.status === 400) {
              alert('Insufficient Balance');
          } else {
              alert('An error occurred. Please try again.');
          }
      } else {
          alert('An error occurred. Please check your connection and try again.');
      }
  })
  }
  return (
    <div>
      <Nav></Nav>

      <div className="w-screen h-screen flex">
        {cart.length === 0 && (
          <div className="w-2/3 h-screen bg-herowhite flex-col justify-center items-center">
            <div className=" h-5/6 flex flex-col justify-center items-center">
              <img src={kranjang} alt="" width={200} />
              <h1 className=" text-xl font-HSR ">
               Keranjangmu masih kosong, Mulai belanja?
              </h1>
              <button
                onClick={() => {
                  window.location = "/market";
                }}
                className="mt-5 p-3 inline-flex items-center px-5 py-1 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg"
              >
                To Market
              </button>
            </div>
            <div className="  w-full flex justify-center items-center mx-auto ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>

              <h1 className="font-HSR text-xl underline hover:no-underline">
                <a href="/cartHist">Lihat Histori Pembelian</a>{" "}
              </h1>
            </div>
          </div>
        )}
        {cart.length !== 0 && (
          <div className="w-2/3 bg-herowhite">
            <div className=" h-screen flex flex-col justify-center items-center">
              <div className=" h-4/5 my-10 overflow-y-auto w-full bg-herowhite">
                {cart.map((value, index) => (
                  <div className="mx-10 h-1/4 mt-10 bg-deepkoamaru flex  justify-between items-center p-5">
                    <div className="flex  items-center w-6/12  ">
                      <div>
                        <img
                          src={value.gambar}
                          alt=""
                          className="  max-w-48 max-h-28"
                        />
                      </div>
                      <div className="   mx-auto ">
                        <h1 className="font-HSR text-white text-xl ">
                          <b>{value.ikan}</b>
                        </h1>
                        <h1 className="font-extralight text-white text-sm">
                          Jumlah : {value.jumlah} Kg
                        </h1>
                        <h1 className="font-extralight text-white text-sm">
                          Harga :Rp. {value.hargaumum}/Kg
                        </h1>
                        <h1 className="font-extralight text-white text-sm">
                          Total :Rp. {value.total}
                        </h1>
                      </div>
                    </div>

                    <div className=" w-80 ">
                      <div className="  flex justify-between items-center ">
                        <h1 className="font-HSR text-white text-2xl  ">
                          <b>
                            {value.bestseller === 1 && <span>Bestseller</span>}
                          </b>
                          <b>
                            {value.bestseller === 0 && <span>Reguler</span>}
                          </b>
                        </h1>
                        <h1 className="font-extralight text-white text-md">
                          Tanggal Order : {value.tglorder}
                        </h1>
                      </div>
                      <div className=" p-2 flex justify-between items-center ">
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Anda yakin ingin membatalkan? "
                            );

                            if (confirmDelete) {
                              destroy(value.idorder);
                              alert("Order dibatalkan!");
                              window.location.reload();
                            } else {
                            }
                          }}
                          className="btn inline-flex items-center px-3 py-1 text-lg font-medium text-center bg-red-500 text-floralwhite hover:bg-floralwhite hover:text-red-500 hover:border-red-500 border-2 transition duration-300 ease-linear rounded-lg "
                        >
                          Batalkan
                        </button>
                        <button
                          onClick={() => {
                            const confirmBuy = window.confirm(
                              "Konfirmasi pembelian?"
                            );

                            if (confirmBuy) {
                                 buy(value.idorder);
                                 alert("Order dibayar!");
                                 window.location.reload();
                            }
                          }}
                          className="inline-flex items-center px-3 py-1 text-lg font-medium text-center bg-floralwhite text-deepkoamaru hover:bg-deepkoamaru hover:text-floralwhite hover:border-floralwhite border-2 transition duration-300 ease-linear rounded-lg "
                        >
                          Bayar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="  w-full flex justify-center items-center mx-10 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>

                <h1 className="font-HSR text-xl underline hover:no-underline">
                  <a href="/cartHist">Lihat Histori Pembelian</a>{" "}
                </h1>
              </div>
            </div>
          </div>
        )}

        <div className=" w-1/3 bg-deepkoamaru">
          <div className=" h-screen flex flex-col justify-center items-center">
            <div className="w-full flex items-center justify-around">
              <h1 className="font-normal font-HSR  text-white text-md">
                Saldo anda: Rp. <b className="text-xl">{currentSaldo}</b>
              </h1>
              <button
                onClick={() => {
                  modalTopup();
                  setSaldo(0);
                  document.getElementById("topup-berhasil").style.display =
                    "none";
                  document.getElementById("topup-gagal").style.display = "none";
                }}
                className="inline-flex items-center px-2 py-1 text-md font-medium text-center bg-floralwhite text-deepkomaru hover:bg-deepkoamaru hover:text-floralwhite hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded"
              >
                Top Up Saldo
              </button>
            </div>

            <div>
              <div className="flex items-center w-full mt-12">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-white font">Upcoming Payment</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="">
                <div>
                  <div class="mt-12 flex items-center justify-center gap-8">
                    {" "}
                    <img
                      class="h-8 w-auto "
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                      alt=""
                    />
                    <img
                      class="h-8 w-auto "
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                      alt=""
                    />
                    <img
                      class="h-8 w-auto "
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                      alt=""
                    />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog
        id="my_modal_2"
        className="modal modal-bottom sm:modal-middle bg-floralwhite  py-10 rounded-3xl"
      >
        <div className="modal-box">
          <div className="">
            <div className="flex flex-row justify-center items-center ">
              <h1 className="text-4xl text-deepkoamaru font-GI font-bold pb-10 ">
                Top Up Saldo !
              </h1>
            </div>

            <div>
              <form action="" className="flex justify-around items-center">
                <label
                  htmlFor=""
                  className="text-2xl text-deepkoamaru font-GI font-bold "
                >
                  Rp. :
                </label>
                <input
                  type="number"
                  name="saldo"
                  id="saldo"
                  value={saldo}
                  onChange={modalTopupValue}
                  className="w-4/5"
                />
              </form>
            </div>

            <div>
              <div
                id="topup-berhasil"
                className=" mt-5 w-96 mx-auto h-20 bg-cornflower rounded-lg flex-col justify-center items-center"
              >
                <div className="flex flex-row items-center justify-center ">
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
                  <h1 className="ms-2 text-deepkoamaru">Top Up Berhasil !</h1>
                </div>

                <small className=" text-deepkoamaru font-HSR  font-bold ">
                  Refresh halaman untuk memperbarui saldo
                </small>
              </div>
              <div
                id="topup-gagal"
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
                <h1 className="ms-2 text-deepkoamaru">Top Up Gagal!</h1>
              </div>
            </div>

            <div className="modal-action ">
              <div className="flex flex-row-reverse justify-between items-center px-28 mt-5">
                <button
                  onClick={() => {
                    topUp();
                  }}
                  className="inline-flex items-center mx-5  px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                >
                  Top Up
                </button>

                <form method="dialog">
                  <button className="btn inline-flex mx-5  items-center px-5 py-3 text-lg font-medium text-center bg-red-500 text-floralwhite hover:bg-floralwhite hover:text-red-500 hover:border-red-500 border-2 transition duration-300 ease-linear rounded-lg ">
                    Kembali
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Cart;
