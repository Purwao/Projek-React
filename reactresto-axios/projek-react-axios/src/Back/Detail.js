import React, { useState } from "react";
import UseGet from "../Hook/UseGet";
import { useForm } from "react-hook-form";

function OrderDetail() {
    const {
        register,
        handleSubmit,

        formState: { errors },
      
    } = useForm();

    let today = new Date().toISOString().slice(0, 10);

    const [awal, setAwal] = useState("1999-01-01");
    const [akhir, setAkhir] = useState(today);    
    const [isi] = UseGet(`/detail/${awal}/${akhir}`);

    function cari(data) {
        setAwal(data.tglawal);
        setAkhir(data.tglakhir);
        console.log(data.tglawal);
      }

    return (
        <>
            <div className="row">
                <h1>Panel Detail Order</h1>
            </div>
            <div className="row">
        <form onSubmit={handleSubmit(cari)} className="col-4">
          <input
            type="date"
            {...register("tglawal")}
            className="form-control my-1 "
          />
          <input
            type="date"
            {...register("tglakhir")}
            className="form-control my-1"
          />
          <button className="btn btn-primary" type="submit">
            Cari
          </button>
        </form>
      </div>
            <div className="row">
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID Order</th>
                            <th>Tgl Order</th>
                            <th>Menu</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isi.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.idorder}</td>
                                <td>{value.tglorder}</td>
                                <td>{value.menu}</td>
                                <td>{value.hargajual}</td>
                                <td>{value.jumlah}</td>
                                <td>{value.jumlah * value.hargajual}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrderDetail;