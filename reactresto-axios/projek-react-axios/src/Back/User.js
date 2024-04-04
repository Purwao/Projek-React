import React, { useState } from 'react'
import UseGet from '../Hook/UseGet'
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { link } from "../Axios/link";

export default function User() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        setValue,
    } = useForm();

    const [isi] = UseGet("/user");
    const [modalOpen, setModalOpen] = useState(false);

    function tambah() {
        setModalOpen(true);
    }

    async function simpan(data) {
        let user = {
            email: data.email,
            password: data.password,
            level: data.level,
            relasi: 'back'
        }
        const res = await link.post('/register', user)                                                                                                    //lmao im so fed up xD
        setModalOpen(false)
    }

    async function ubahStatus(id){
        const data = isi.filter(value => value.id === id)

        let status = 0
        if (data[0].status === 1) {
            status = 0
        }else{
            status = 1
        }

        let kirim = {
            status: status
        }

        const res = await link.put(`/user/${id}`, kirim)
    }

    return (
        <>
            <ReactModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                // onAfterOpen={ isiForm }
                style={{
                    overlay: { backgroundColor: "rgba(20,20,40,40)" },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        overflow: "hidden",
                    },
                }}>
                <div className="row">
                    <div className="mx-4">
                        <h1>Register User Baru</h1>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <form onSubmit={handleSubmit(simpan)} className="mb-3">
                            <input
                                type="email"    
                                {...register("email", { required: true })}
                                className="form-control my-1"
                                placeholder="Email..."
                            />
                            {errors.email && (
                                <p className="text-danger">
                                    This field is required.
                                </p>
                            )}

                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="form-control my-1"
                                placeholder="Pasword..."
                            />
                            {errors.password && (
                                <p className="text-danger">
                                    This field is required.
                                </p>
                            )}
                            
                            <select name="level" {...register("level", { required: true })} className="form-select">
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                                <option value="koki">Koki</option>
                            </select>

                            <button
                                type="submit"
                                className="btn btn-primary my-2">
                                Submit
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="btn btn-secondary my-2 mx-2">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </ReactModal>
            <div className="row">
                <div>
                    <h1>Panel User</h1>
                </div>
            </div>
            <div className="row">
                <div>
                    <input
                        onClick={() => tambah()}
                        type="submit"
                        value="Tambah"
                        className="btn btn-primary"
                    />
                </div>
            </div>
            <div className="row">
                <table className="table table-bordered mt-4 fs-6">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isi.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.email}</td>
                                <td>{value.level}</td>
                                <td className="text-center">
                                    {value.status === 1 ? (
                                        <input
                                            type="button"
                                            value="Aktif"
                                            className="btn btn-success"
                                            onClick={() => ubahStatus(value.id)}
                                        />
                                    ) : (
                                        <input
                                            type="button"
                                            value="Banned"
                                            className="btn btn-danger"
                                            onClick={() => ubahStatus(value.id)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}