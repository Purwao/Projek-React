import React from "react";
import { useEffect, useState } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import UseGet from "../Hook/UseGet";
import UseDel from "../Hook/UseDel";

export default function Menu() {
  const [isi] = UseGet("/menu");
  const { del, pesan, setPesan } = UseDel("/menu");
  const [kategori,setKategori]= useState([]);
  const [gambar,setGambar] = useState([]);
  const [idkategori,setIdkategori] = useState([]);
  const[idmenu,setIdmenu] = useState("");
  const [pilihan,setPilihan] = useState(true);
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  
  useEffect(() => {
    let ambil = true;
    async function fetchData() {
        const response = await link.get('/kategori');
        if (ambil) {
            setKategori(response.data);
        }
    }
    fetchData();
    return () => (ambil = false);
}, [kategori]);




  function simpan(data) {
    // LMAO IM SO DONE WITH THIS SHT -LAWRENS
    // console.log(data);
    // console.log(data.gambar[0].name)
    
    const formData= new FormData();
    formData.append('idkategori',data.idkategori)
    formData.append('menu',data.menu)
    formData.append('gambar',data.gambar[0])
    formData.append('harga',data.harga)

    console.log(pilihan);
   
    if (pilihan) {
      link.post('/menu',formData).then(res=>setPesan(res.data.msg));
  }else{
      link.post(`/menu/${idmenu}`,formData).then(res=>setPesan(res.data.msg));
      setPilihan(true);
  }
    
    // link.post('/menu',formData).then(res=>{
    //   setPesan(res.data.msg);
    // })

    reset()
    
  }

  async function ubah(id) {
    const res= await link.get('/menu/'+id)
    console.log(res.data)
  
    setValue('menu',res.data[0].menu);
    setValue('harga',res.data[0].harga);
    setGambar(<img src={res.data[0].gambar} alt="" style={{ maxHeight: "200px" }}/>)
    setIdkategori(res.data[0].idkategori);
    setIdmenu(res.data[0].idmenu);
    setPilihan(false);


  }
   
  return (
    <div>
      <div className="row">
        <h1>Data Menu</h1>
        <h3 className="text-danger">{pesan}</h3>
      </div>
      <div className="row">
        <div>
          <form onSubmit={handleSubmit(simpan)}>
            <div className="form-group">
              <label htmlFor="menu-field">Nama Menu</label>
              <input
                id="menu-field"
                type="text"
                className="form-control"
                placeholder="menu disini"
                name="menu"
                {...register("menu", { required: true })}
              />
              {errors.menu && (
                <p className="text-danger">This Field Is Required bro !</p>
              )}
            </div>
            <label htmlFor="idkategori">Kategori</label>
            <select name="idkategori" {...register("idkategori", { required: true })} className="form-select">
                        {kategori.map((value, index) => value.idkategori === idkategori ?
                         ( <option key={index} selected value={value.idkategori}>{value.kategori}</option>) :
                         (<option key={index} value={value.idkategori}>{value.kategori}</option>))}
                    </select>
            <label htmlFor="gambar">Gambar</label>
            <input
              type="file"
              name="gambar"
              {...register("gambar", { required: false })}
              className="form-control my-1"
            />
            {errors.gambar && (
              <p className="text-danger">This field is required</p>
            )}
            <div className="form-group">
              <label htmlFor="menu-field">Harga</label>
              <input
                id="harga-field"
                type="text"
                className="form-control"
                placeholder="harga?"
                name="Harga"
                {...register("harga", { required: true })}
              />
              {errors.menu && (
                <p className="text-danger">This Field Is Required bro !</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <table className="mt-4 table ">
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Menu</th>
              <th>gambar</th>
              <th>harga</th>
              <th>Hapus</th>
              <th>Ubah</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((value, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{value.menu}</td>
                <td>
                  <img src={value.gambar} alt="" width={100} height={100} />
                </td>
                <td>{value.harga}</td>
                <td
                  className="btn-outline-danger btn"
                  onClick={() => del(value.idmenu)}
                >
                  Hapus
                </td>
                <td
                  className="btn-outline-warning btn"
                  onClick={() => ubah(value.idmenu)}
                >
                  Ubah
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
