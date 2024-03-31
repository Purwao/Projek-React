import React from "react";
import { useParams } from "react-router-dom";


function Konten() {
    const { konten } = useParams();
    let tampil;
    console.log(konten);

    if (konten === "kategori") {
        tampil = "kategori"
    }
    if (konten === "menu") {
        tampil = "menu"
    }
    if (konten === "pelanggan") {
        tampil = "pelanggan"
    }
    if (konten === "order") {
        tampil = "order"
    }
    if (konten === "orderdetail") {
        tampil = "orderdetail"
    }
    


    return (
        <h2>
            tampil
        </h2>
    
    );

}

export default Konten;