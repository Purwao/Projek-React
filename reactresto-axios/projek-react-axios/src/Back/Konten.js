import React from "react";
import { useParams } from "react-router-dom";
import Kategori from "./Kategori";
import Menu from "./Menu";
import Pelanggan from "./Pelanggan";


function Konten() {
    const { konten } = useParams();
    let tampil;
    console.log(konten);

    if (konten === "kategori") {
        tampil = <Kategori />
    }
    if (konten === "menu") {
        tampil = <Menu />
    }
    if (konten === "pelanggan") {
        tampil = <Pelanggan />
    }
    if (konten === "order") {
        tampil = "order"
    }
    if (konten === "orderdetail") {
        tampil = "orderdetail"
    }
    


    return (
        <div>
            {tampil}
        </div>
    
    );

}

export default Konten;