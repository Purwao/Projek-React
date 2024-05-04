import React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import UseGet from '../Axios/useGet';
import axios from 'axios';
import { link } from '../Axios/link';
import UseDel from '../Axios/useDel';




function Ikan() {

  let [pesan, setPesan] = useState("");
  const [isi] = UseGet('fish');
  const { del, pesanDel, setPesanDel } = UseDel("fish");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();


  function save(data) {
    //LAWRENS HERE, FUKIN DONE WITH FORM DATA TYPE SHI AAAAAAAAAAAAAAA
  const formData= new FormData();
  formData.append('ikan',data.ikan)
  formData.append('habitat',data.habitat)
  formData.append('gambar',data.gambar[0])
  formData.append('hargaumum',data.hargaumum)
  formData.append('ukuranumum',data.ukuranumum)

    link.post("fish", formData).then((res) => {
      setPesan(res.data.msg);
      console.log(pesan);
    });

    reset();
  }


  return (
    <div>
      <div className="container mx-auto md:px-56 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className="text-xl font-bold mb-4">Data Ikan</h1>
            <form method='post' onSubmit={handleSubmit(save)}>
              <div className="mb-4">
                <label htmlFor="kategori-field" className="block mb-1">Nama Ikan</label>
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
              <div className="mb-4">
                <label htmlFor="keterangan-field" className="block mb-1">Habitat</label>
                <input
                  type="text"
                  className="form-input"
                  id="habitat"
                  placeholder="Habitat Ikan"
                  {...register("habitat", { required: true })}
                  name="habitat"
                />
                {errors.habitat && (
                  <p className="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="keterangan-field" className="block mb-1">Harga Umum</label>
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
                <label htmlfor="ukuranumum" classname="block mb-1">Ukuran Umum</label>
                <br />
                <select classname="form-select" id="ukuranumum" {...register("ukuranumum", { required: true })} name="ukuranumum">
                  <option value="20" selected>0-20 Cm</option>
                  <option value="50">21-50 Cm</option>
                  <option value="100">51++</option>
                </select>
                {errors.ukuranumum && (
                <p classname="text-red-500">This Field Is Required bro!</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="keterangan-field" className="block mb-1">Gambar</label>
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">List Kategori</h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nomor</th>
                  <th className="px-4 py-2">Ikan</th>
                  <th className="px-4 py-2">Habitat</th>
                  <th className="px-4 py-2">Harga Umum</th>
                  <th className="px-4 py-2">Ukuran Umum</th>
                  <th className="px-4 py-2">Gambar</th>
                  <th className="px-4 py-2">Hapus</th>
                  <th className="px-4 py-2">Ubah</th>
                </tr>
              </thead>
              <tbody>
                {isi.map((value, index) => (
                 <tr key={index}>
                 <td className="px-4 py-2">{index + 1}</td>
                 <td className="px-4 py-2">{value.ikan}</td>
                 <td className="px-4 py-2">{value.habitat}</td>
                 <td className="px-4 py-2">{value.hargaumum}</td>
                 <td className="px-4 py-2">{value.ukuranumum}</td>
                 <td>
                  <img src={value.gambar} alt="" width={100} height={100} />
                </td>
                 <td className="px-4 py-2 text-light bg-secondary">
                   <b  onClick={() => del(value.id)} className="hover:cursor-pointer">Hapus</b>
                 </td>
                 <td className="px-4 py-2 btn btn-success">Ubah</td>
               </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Ikan