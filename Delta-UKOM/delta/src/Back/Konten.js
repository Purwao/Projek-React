import React from 'react'
import { useParams } from 'react-router-dom';
import Ikan from './Ikan';
import Order from './Order';
import Pelanggan from './Pelanggan';

function Konten() {

    const { konten } = useParams();
    let tampil;
    // console.log(konten);

    if (konten === "fish") {
        tampil = <Ikan />
    }
    if (konten === "orders") {
        tampil = <Order />
    }
    if (konten === "users") {
        tampil = <Pelanggan />
    }
   
  return (
    <div>{tampil}</div>
  )
}

export default Konten