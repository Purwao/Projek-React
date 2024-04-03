import React from 'react'
import UseGet from '../Hook/UseGet';

export default function Order() {
    const [isi] = UseGet(`/order`);


  return (
    <div >
    <div className='row'>
        <h2>Data Order</h2>
    </div>
    <div className="row">
        <table className="table table-bordered mt-4 fs-6">
            <thead>
                <tr className="text-center">
                    <th>No</th>
                    <th>Faktur</th>
                    <th>Pelanggan</th>
                    <th>Tgl Order</th>
                    <th>Total</th>
                    <th>Dibayar</th>
                    <th>Kembalian</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {isi.map((value, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{value.idorder}</td>
                        <td>{value.pelanggan}</td>
                        <td>{value.tglorder}</td>
                        <td>{value.total}</td>
                        <td>{value.bayar}</td>
                        <td>{value.kembali}</td>
                        <td>
                            {value.status === 0 ? (
                                <button
                                    className="btn btn-primary">
                                   Bayar
                                </button>
                            ) : (
                                <p>Lunas</p>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  )
}
