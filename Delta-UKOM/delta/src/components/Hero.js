import React, { useState } from "react";
import hero1 from "../photos/download (1).jpeg";

import UseGet from "../Axios/useGet";

import { useForm } from "react-hook-form";
import { link } from "../Axios/link";



function Hero() {
  // Search Bar
  const [result, setResult] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
   formState: { errors }

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



  function showModal4(id) {
    count=1
    document.getElementById("count-display").innerHTML = count;
    document.getElementById("harga-display").innerHTML = result.hargaumum;
    console.log(id);
    link.get("modal/" + id).then((res) => {
      setResult(res.data);
      console.log(result)
      console.log(res)
      document.getElementById("my_modal_6").showModal();
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
      <section className=" bg-herowhite text-black  h-screen flex justify-center items-center">
        <div className="container  text-center flex justify-between items-center">
          <div className=" w-2/4 text-start">
            <h1 className="text-7xl font-bold mb-2 font-GI">
              Welcome to Our Website
            </h1>
            <p className="text-lg mb-6 font-HSR">
              Temukan ikan yang bersumber lestari, berkualitas tinggi. Baik anda
              mencari hasil tangkapan sempurna untuk hidangan berikutnya atau
              ikan segar untuk restoran, kami siap membantu!
            </p>
            <div>
            <form
  action=""
  className="flex-row justify-between items-center"
  onSubmit={handleSubmit(search)}
>
  <input
    type="text"
    name="search"
    id="search"
    className=""
    placeholder="⌕ Search..."
    {...register("search", { required: true })}
  />
     {errors.search && <span>This field is required</span>}
  <button
    type="submit"
    className="bg-deepkoamaru hover:bg-floralwhite hover:text-black text-floralwhite font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded"
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
                          className=" w-96 rounded-3xl"
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
                            showModal4(result.id);
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
            <img src={hero1} width={600} alt="" />
          </div>
        </div>
      </section>
      <dialog
                id="my_modal_6"
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
  );
}

export default Hero;
