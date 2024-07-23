import React from "react";
// import img from "../photos/advertisement.png";
// import UseGet from "../Axios/useGet";

function Playground() {
  // const [isi] = UseGet("/fish");
  return (
    <div>
  {/* Search Bar */}
            {/* <form
              action=""
              className="  flex-row justify-between items-center "
              onSubmit={handleSubmit(search)}
            >
              <input
                type="text"
                name=""
                id=""
                className="me-2 rounded-sm "
                placeholder="Search..."
                {...register("search", { required: true })}
              />
              <button
                type="submit"
                className="bg-floralwhite hover:bg-deepkoamaru hover:text-floralwhite text-deepkoamaru font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-deepkoamaru transition duration-700 ease-in-out rounded  "
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
                      className="inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg ">
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
            </dialog> */}
  </div>


 
  );
}

export default Playground;
