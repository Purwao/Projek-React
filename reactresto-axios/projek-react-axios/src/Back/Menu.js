import React from 'react'
import { useEffect, useState } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import UseGet from "../Hook/UseGet";
import UseDel from '../Hook/UseDel';

export default function Menu() {

  const [isi]= UseGet('/menu');
  const {del,pesan} = UseDel('/menu')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  

  return (
    <div>
      <div className='row'>
        <h1>Data Menu</h1>
        <h3 className='text-danger'>{pesan}</h3>
      </div>
      <div className='row'>
        <div>
        <form>
        <select name="idkategori" {...register("idkategori", { required: true })} className="form-select">
                        {kategori.map((value, index) => (
                            value.idkategori === idKategori ?
                                (<option key={index} selected value={value.idkategori}>{value.kategori}</option>) :
                                (<option key={index} value={value.idkategori}>{value.kategori}</option>)
                        ))}
                    </select>
            <div className="form-group">
              <label htmlFor="kategori-field">Menu</label>
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
        
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className='row'>
      <table className="mt-4 table table-striped table-white">
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
                <td><img src={value.gambar} alt='' width={100} height={100}/></td>
                <td>{value.harga}</td>
                <td
                  className="btn btn-outline-danger"
                  onClick={() => del(value.idmenu)}
                >
                  Hapus
                </td>
                {/* <td
                  className="btn btn-outline-warning"
                  onClick={() => ubah(value.idkategori)}
                >
                  Ubah
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
