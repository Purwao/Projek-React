import React, { useEffect, useState } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import UseGet from "../Hook/UseGet";

export default function Kategori() {
  // let [isi, setIsi] = useState([]);
  const [isi]= UseGet('/kategori');
  let [pesan, setPesan] = useState("");
  
  const [idKategori, setIdKategori] = useState("");
  const [pilihan, setPilihan] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // async function fetchData() {
  //   const request = await link.get("/kategori");
  //   setIsi(request.data);
  // }

  function save(data) {
    if (pilihan) {
      link.post("/kategori", data).then((res) => {
        setPesan(res.data.msg);
      });
    }
    else{
    link.put(`/kategori/${idKategori}`, data).then((res) => {
      setPesan(res.data);
      setPilihan(true)
    }
    );
    }
    reset();
  }

  function del(id) {
    if (window.confirm("yakin mau dihapus?")) {
      // console.log(id)
      link.delete("/kategori/" + id).then((res) => {
        // console.log(res);
        setPesan(res.data);
      });
    }
  }

  async function ubah(id) {
    const res = await link.get("/kategori/" + id);
    // console.log(res)
    console.log(res.data[0].kategori);
    console.log(res.data[0].keterangan);

    setValue("kategori", res.data[0].kategori);
    setValue("keterangan", res.data[0].keterangan);

    setIdKategori(res.data[0].idkategori);
    setPilihan(false);
  }

  // useEffect(() => {
  //   fetchData();
  //   // console.log("isi");
  // }, [isi]);

  return (
    <div>
      <div className="row">
        <h1>Data Kategori</h1>
        <span>
          <h2 className="text-danger">Message : {pesan}</h2>
        
        </span>
      </div>
      <div className="row">
        <div>
          <form onSubmit={handleSubmit(save)}>
            <div className="form-group">
              <label htmlFor="kategori-field">Kategori</label>
              <input
                id="kategori-field"
                type="text"
                className="form-control"
                placeholder="Kategori disini"
                name="kategori"
                {...register("kategori", { required: true })}
              />
              {errors.kategori && (
                <p className="text-danger">This Field Is Required bro !</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="keterangan-field">Keterangan</label>
              <input
                type="text"
                className="form-control"
                id="keterangan-field"
                placeholder="Keterangan disini"
                {...register("keterangan", { required: true })}
                name="keterangan"
              />
            </div>
            {errors.keterangan && (
              <p className="text-danger">This Field Is Required bro !</p>
            )}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <table className="mt-4 table table-striped table-white">
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Id Kategori</th>
              <th>Hapus</th>
              <th>Ubah</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((value, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{value.kategori}</td>
                <td>{value.keterangan}</td>
                <td>{value.idkategori}</td>
                <td
                  className="btn btn-outline-danger"
                  onClick={() => del(value.idkategori)}
                >
                  Hapus
                </td>
                <td
                  className="btn btn-outline-warning"
                  onClick={() => ubah(value.idkategori)}
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
