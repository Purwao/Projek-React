import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { link } from "../Axios/link";
import { useNavigate } from "react-router-dom";


function Order() {
  let today = new Date().toISOString().slice(0, 10);
  const [awal, setAwal] = useState("1999-01-01");
  const [akhir, setAkhir] = useState(today);

  const {
    register,
    handleSubmit,
  } = useForm();
  
  const [isi, setIsi] = useState([]);

  useEffect(() => {
    let ambil = true;

    async function fetchData() {
      const response = await link.get(`order/${awal}/${akhir}`);
      if (ambil) {
        setIsi(response.data);
      }
    }
    fetchData();
    
  }, [awal, akhir]);

  function cari(data) {
    const newAwal = data.tglawal;
    const newAkhir = data.tglakhir;

    setAwal(newAwal);
    setAkhir(newAkhir);

    console.log(awal);
    console.log(akhir);
  }
  if (Array.isArray(isi)) {
    isi.map(item => {
        // Your map logic here
    });
} else {
    window.location.reload();
}

  return (
    <div>
      <div className=" ">
        <div className=" w-screen h-screen flex justify-around  ">
          <div className="w-1/3">
            <form onSubmit={handleSubmit(cari)} className="col-4">
              <div className="flex flex-col h-screen py-20 items-center ">
                <h1>Sort by date:</h1>
                <input
                  type="date"
                  {...register("tglawal")}
                  className="form-input my-1 "
                  onChange={(e) => setAwal(e.target.value)}
                />
                <input
                  type="date"
                  {...register("tglakhir")}
                  className="form-input my-1"
                  onChange={(e) => setAkhir(e.target.value)}
                />

                <button
                  className="bg-deepkoamaru  hover:bg-floralwhite hover:text-deepkoamaru text-floralwhite font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded"
                  type="submit"
                >
                  Cari
                </button>
              </div>
            </form>
          </div>
          <div className=" h-screen overflow-auto ">
            <h2 className="text-xl font-bold mb-4">List Order</h2>
            <div className="">
              <table className="border-separate border-2 border-black text-sm">
                <thead>
                  <tr className="border-separate border-2 border-black ">
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Faktur
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Pelanggan
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Ikan
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Harga Umum
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Jumlah
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Total
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Tanggal Order
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Status
                    </th>
                    <th className="px-4 py-2 border-separate border-2 border-black">
                      Gambar
                    </th>
                  </tr>
                </thead>
                
                <tbody>
                  {isi.map((value, index) => (
                    <tr
                      key={index}
                      className="border-separate border-2 border-black "
                    >
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.idorder}
                      </td>
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.email}
                      </td>
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.ikan}
                      </td>
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.hargaumum}
                      </td>
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.jumlah}
                      </td>
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.total}
                      </td>
                      <td className="px-4 py-2 border-separate border-2 border-black">
                        {value.tglorder}
                      </td>
                      {value.status === 1 ? (
                        <td className="px-4 py-2 border-separate border-2 border-black bg-green-400">
                          Lunas
                        </td>
                      ) : (
                        <td className="px-4 py-2 border-separate border-2 border-black bg-red-400">
                          Belum
                        </td>
                      )}
                      <td className="border-separate border-2 border-black">
                        <img
                          src={value.gambar}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
