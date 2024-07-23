import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import UseGet from "../Axios/useGet";

import { link } from "../Axios/link";
import UseDel from "../Axios/useDel";

function Pelanggan() {
 
  
    let [pesan, setPesan] = useState("");
    const [isi] = UseGet("customer");
    const { del, pesanDel, setPesanDel } = UseDel("fish");
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,
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
          <div className=" w-screen h-screen flex justify-center  ">
            <div className="w-8/12 h-screen overflow-y-auto">
              <h2 className="text-xl font-bold">List Users</h2>
              <div className="">
                <table className="border-separate border-2 border-black text-sm w-full">
                  <thead>
                    <tr  className="border-separate border-2 border-black ">
                      <th className="px-4 py-2 border-separate border-2 border-black">Nomor</th>
                      <th className="px-4 py-2 border-separate border-2 border-black">Pelanggan</th>
                      <th className="px-4 py-2 border-separate border-2 border-black">Uid</th>
                      <th className="px-4 py-2 border-separate border-2 border-black">Role</th>
                      <th className="px-4 py-2 border-separate border-2 border-black">Saldo</th>
                      <th className="px-4 py-2 border-separate border-2 border-black">Status</th>
                   
               
                    </tr>
                  </thead>
                  <tbody >
                    {isi.map((value, index) => (
                      <tr key={index}  className="border-separate border-2 border-black ">
                        
                        <td className="px-4 py-2 border-separate border-2 border-black">{index}</td>
                        <td className="px-4 py-2 border-separate border-2 border-black">{value.email}</td>
                          <td className="px-4 py-2 border-separate border-2 border-black">{value.id}</td>
                        {value.role === 0 ? <td className="px-4 py-2 border-separate border-2 border-black bg-deepkoamaru text-white">Users</td>: <td className="px-4 py-2 border-separate border-2 border-black bg-slate-700 text-white">Admin</td>}
                      
                        <td className="px-4 py-2 border-separate border-2 border-black">{value.saldo}</td>
                        {value.status === 1 ? <td className="px-4 py-2 border-separate border-2 border-black "><button className="bg-green-600 h-full text-white py-1 w-full">Aktif</button></td>: <td className="px-4 py-2 border-separate border-2 border-black"><button className="bg-red-800 h-full text-white py-1 w-full">Banned</button></td>}
                        
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

export default Pelanggan