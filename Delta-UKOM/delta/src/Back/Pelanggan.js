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

    function banUser(id){
      console.log(id);
      link.post(`banUser/${id}`).then((res)=>{
        console.log(res)
      })
      window.location.reload();
    }
    function permitUser(id){
      console.log(id);
      link.post(`permitUser/${id}`).then((res)=>{
        console.log(res)
      })
      window.location.reload();
    }
    function switchRole(id){
      console.log(id);
      link.post(`switchRole/${id}`).then((res)=>{
        console.log(res)
      })
      window.location.reload();
    }
  
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
          <div className=" w-screen h-screen flex justify-end  ">
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
                        {value.role === 0 ? <td className="px-4 py-2 border-separate border-2 border-black "> <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"  onClick={()=>{switchRole(value.id)}} >Users</button> </td>:null}
                        {value.role === 1 ? <td className="px-4 py-2 border-separate border-2 border-black  "><button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"  onClick={()=>{switchRole(value.id)}} >Kurir</button> </td>:null}
                        {value.role === 2 ? <td className="px-4 py-2 border-separate border-2 border-black "><button className=" bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"  onClick={()=>{switchRole(value.id)}} >Manager</button> </td>:null}
                        {value.role === 3 ? <td className="px-4 py-2 border-separate border-2 border-black "><button className="bg-gray-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"  onClick={()=>{switchRole(value.id)}} >Admin</button> </td>:null}
                      
                        <td className="px-4 py-2 border-separate border-2 border-black">{value.saldo}</td>
                        {value.status === 1 ? <td className="px-4 py-2 border-separate border-2 border-black "><button onClick={()=>{banUser(value.id)}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">Aktif</button></td>: <td className="px-4 py-2 border-separate border-2 border-black"><button onClick={()=>{permitUser(value.id)}} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded inline-flex items-center">Banned</button></td>}
                        
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