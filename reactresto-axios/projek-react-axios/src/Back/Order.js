import React, { useState } from "react";
import UseGet from "../Hook/UseGet";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { link } from "../Axios/link";

export default function Order() {
  let today = new Date().toISOString().slice(0, 10);
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [pelanggan, setPelanggan] = useState("");
  const [idOrder, setIdOrder] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  
  function filterData(id) {
    let data = isi.filter((value) => (value.idorder === id));
    setPelanggan(data[0].pelanggan);
    setTotal(data[0].total);
    setIdOrder(data[0].idorder);
    setModalOpen(true);
}

function isiForm(){
    setValue("total", total);
}

async function simpan(data) {
    let hasil = {
        bayar: data.bayar,
        kembali: data.bayar - data.total,
        status: 1,
    }

    const res = await link.post(`/order/${idOrder}`, hasil);
    setModalOpen(false);

}   

const [awal, setAwal] = useState("1999-01-01");
const [akhir, setAkhir] = useState(today);    
const [isi] = UseGet(`/order/${awal}/${akhir}`);

function cari(data) {
  setAwal(data.tglawal);
  setAkhir(data.tglakhir);
  console.log(data.tglawal);
  console.log(errors);
}
  return (
   <div>
      <div className="row">
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
                      className="btn btn-primary"
                      onClick={() => {
                        filterData(value.idorder);
                      }}
                    >
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
      <ReactModal onAfterOpen={isiForm()}
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: { backgroundColor: "slateblue", },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "25px",
          },
        }}
      >
        <div className="row">
          <h1>Pembayaran untuk {pelanggan}</h1>
        </div>
        <div className="row">
          <form className="mb-3" onSubmit={handleSubmit(simpan)}>
            <input
              type="number"
              {...register("total", { required: true })}
              className="form-control my-1"
              placeholder="Total ?"
              disabled
            />

            <input
              type="number"
              {...register("bayar", { required: true, min: total })}
              className="form-control my-1"
              placeholder="Bayar Disini Bosku"
            />
            {errors.bayar && <p className="text-danger">Uangmu Kurang Bos :D</p>}

            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-secondary my-2 mx-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </ReactModal>
</div>
  
  );
}
