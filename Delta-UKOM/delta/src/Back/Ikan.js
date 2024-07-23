import React from "react";
import { useForm } from "react-hook-form";

import UseGet from "../Axios/useGet";

import { link } from "../Axios/link";
import UseDel from "../Axios/useDel";

function Ikan() {

  const [isi] = UseGet("fish");
  const { del} = UseDel("fish");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
   
  } = useForm();

  function save(data) {
    // LAWRENS HERE, FUKIN DONE WITH FORM DATA TYPE SHI AAAAAAAAAAAAAAA
    const formData = new FormData();
    formData.append("ikan", data.ikan);
    formData.append("habitat", data.habitat);
    formData.append("gambar", data.gambar[0]);
    formData.append("hargaumum", data.hargaumum);
    formData.append("ukuranumum", data.ukuranumum);
    formData.append("bestseller", data.bestseller);

    link.post("fish", formData).then((res) => {
      // setPesan(res.data.msg);
      // console.log(pesan);
    });

    console.log(data);
    reset();

    window.location.reload();
    
  }

  console.log(isi)

  return (
    <div>
      <div className=" ">
        <div className=" w-screen h-screen flex justify-around  ">
          <div>
            
            <form className="flex-col justify-center items-center text-sm" onSubmit={handleSubmit(save)}>
              <div className="mb-2">
                <label htmlFor="kategori-field" className="block  mb-1">
                  Nama Ikan
                </label>
                <input
                  id="ikan"
                  type="text"
                  className="form-input"
                  placeholder="Nama Ikan"
                  {...register("ikan", { required: true })}
                  name="ikan"
                />
                {errors.ikan && (
                  <p className="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="keterangan-field" className="block text-sm mb-1">
                  Habitat
                </label>
                <select
                  classname="form-select"
                  id="habitat"
                  {...register("habitat", { required: true })}
                  name="habitat"
                >
                  <option value="Air Laut" selected>
                    Air Laut
                  </option>
                  <option value="Air Tawar">Air Tawar</option>
                  <option value="Air Asin">Air Asin</option>
                </select>
                {errors.bestseller && (
                  <p classname="text-red-500">This Field Is Required bro!</p>
                )}
                
              </div>
              <div className="mb-4">
                <label htmlFor="keterangan-field" className="block mb-1">
                  Harga Umum
                </label>
                <input
                  type="number"
                  className="form-input"
                  id="hargaumum"
                  placeholder="Harga Umum"
                  {...register("hargaumum", { required: true })}
                  name="hargaumum"
                />
                {errors.hargaumum && (
                  <p className="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <div classname="mb-4">
                <label htmlfor="ukuranumum" classname="block mb-1">
                  Ukuran Umum
                </label>
                <br />
                <select
                  classname="form-select"
                  id="ukuranumum"
                  {...register("ukuranumum", { required: true })}
                  name="ukuranumum"
                >
                  <option value="20" selected>
                    0-20 Cm
                  </option>
                  <option value="50">21-50 Cm</option>
                  <option value="100">51++</option>
                </select>
                {errors.ukuranumum && (
                  <p classname="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <div classname="mb-4">
                <label htmlfor="bestseller" classname="block mb-1">
                  BestSeller
                </label>
                <br />
                <select
                  classname="form-select"
                  id="bestseller"
                  {...register("bestseller", { required: true })}
                  name="bestseller"
                >
                  <option value="1" selected>
                    True
                  </option>
                  <option value="0">False</option>
                </select>
                {errors.bestseller && (
                  <p classname="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="keterangan-field" className="block mb-1">
                  Gambar
                </label>
                <input
                  type="file"
                  className="form-input"
                  id="gambar"
                  placeholder="Gambar Ikan"
                  {...register("gambar", { required: true })}
                  name="gambar"
                />
                {errors.gambar && (
                  <p className="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <button type="submit" className="bg-deepkoamaru  hover:bg-floralwhite hover:text-deepkoamaru text-floralwhite font-bold py-2 px-4 border-b-4 border-blue-200 hover:border-floralwhite transition duration-700 ease-in-out rounded">
                Submit
              </button>
            </form>
          </div>
          <div className=" h-screen overflow-auto ">
            <h2 className="text-xl font-bold mb-4">List Ikan</h2>
            <div className="">
              <table className="border-separate border-2 border-black text-sm">
                <thead>
                  <tr  className="border-separate border-2 border-black ">
                    <th className="px-4 py-2 border-separate border-2 border-black">Nomor</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Ikan</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">BestSeller</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Habitat</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Harga Umum</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Ukuran Umum</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Gambar</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Hapus</th>
                    <th className="px-4 py-2 border-separate border-2 border-black">Ubah</th>
                  </tr>
                </thead>
                <tbody >
                  {isi.map((value, index) => (
                    <tr key={index}  className="border-separate border-2 border-black ">
                      <td className="px-4 py-2 border-separate border-2 border-black">{index + 1}</td>
                      <td className="px-4 py-2 border-separate border-2 border-black">{value.ikan}</td>
                      <td className="px-4 py-2 border-separate border-2 border-black">{value.bestseller}</td>
                      <td className="px-4 py-2 border-separate border-2 border-black">{value.habitat}</td>
                      <td className="px-4 py-2 border-separate border-2 border-black">{value.hargaumum}</td>
                      <td className="px-4 py-2 border-separate border-2 border-black">{value.ukuranumum}</td>
                      <td className="border-separate border-2 border-black">
                        <img
                          src={value.gambar}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </td>
                      <td onClick={() => {del(value.id);
                            window.location.reload();
                          }
                          } className="bg-red-500 hover:cursor-pointer px-4 py-2 text-light bg-secondary border-separate border-2 border-black">
                        <b
                          className=" text-white underline hover:no-underline"
                        >
                          Hapus
                        </b>
                      </td>
                      <td className="px-4 py-2 btn btn-success border-separate border-2 border-black">Ubah</td>
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

export default Ikan;
