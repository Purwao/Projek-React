import React, { useEffect, useState } from "react";
import { link } from "../Axios/link";

export default function Kategori() {
  let [isi, setIsi] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await link.get("/kategori");
      setIsi(request.data);
    }

    fetchData();
    console.log("isi");
  }, []);

  return (
    <div>
      <table > 
        <tr>
          <th>Nomor</th>
          <th>Kategori</th>
          <th>Keterangan</th>
          <th>Id Kategori</th>
        </tr>

        {isi.map((value, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{value.kategori}</td>
            <td>{value.keterangan}</td>
            <td>{value.idkategori}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
