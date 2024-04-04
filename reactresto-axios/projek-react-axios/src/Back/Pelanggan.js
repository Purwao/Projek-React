import React from 'react'
import { useEffect, useState } from "react";
import { link } from "../Axios/link";
import { useForm } from "react-hook-form";
import UseGet from "../Hook/UseGet";
import UseDel from '../Hook/UseDel';

export default function Pelanggan() {
  const [isi]= UseGet('/pelanggan')
  const {del,pesan} = UseDel('/pelanggan')
  return (
    <div>
        <div>
      <div className='row'>
        <h1>Data Pelanggan</h1>
        <h3 className='text-danger'>{pesan}</h3>
      </div>
      <div className='row'>
      <table className="mt-4 table table-striped table-white">
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Nama Pelanggan</th>
              <th>Alamat</th>
              <th>Kontak</th>
              <th>Hapus</th>
             
            </tr>
          </thead>
          <tbody>
            {isi.map((value, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{value.pelanggan}</td>
                <td>{value.alamat}</td>
                <td>{value.telp}</td>
                 <td
                  className="btn btn-outline-danger"
                  onClick={()=>del(value.idpelanggan)}
                >
                  Hapus
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
