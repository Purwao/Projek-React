import { useState } from "react";
import Tabel from "./Tabel";

function Menu() {
    let judul="Restoran World's End P"
    let [menu, setMenu]=useState([
        {
            idmenu: 1, 
            idkategori: 3, 
            menu: "Ayam Bakar", 
            gambar: "img/nasiayam.jpg", 
            harga: "20.000",
            tipe: "Benar Makanan"
        },
        {
            idmenu: 2, 
            idkategori: 3, 
            menu: "Nasi Padang", 
            gambar: "img/nasipadang.png", 
            harga: "10.000",
            tipe: "Benar Makanan"
        }, 
        {
            idmenu: 3, 
            idkategori: 2, 
            menu: "Pisang Raja", 
            gambar: "img/pisangraja.png", 
            harga: "14.000",
            tipe: "Bukan Makanan"
        },
        {
            idmenu: 4, 
            idkategori: 1, 
            menu: "Jus Jeruk", 
            gambar: "img/esjeruk.jpg", 
            harga: "8.000",
            tipe: "Bukan Makanan"
        },
        {
            idmenu: 5, 
            idkategori: 1, 
            menu: "Es Teh", 
            gambar: "img/esteh.png", 
            harga: "4.000",
            tipe: "Bukan Makanan"
        },
        {
            idmenu: 6, 
            idkategori: 2, 
            menu: "Apel", 
            gambar: "img/apelmanalagi.jpg", 
            harga: "5.000",
            tipe: "Bukan Makanan"
        }
    ]);
    return (
      <div className="App">
        <Tabel menu={menu} title={judul} />     
        <Tabel menu={menu.filter((data)=>(data.idkategori===1))} title="Menu Minuman" />     
        <Tabel menu={menu.filter((data)=>(data.idkategori===2))} title="Menu Buah" />     
        <Tabel menu={menu.filter((data)=>(data.idkategori===3))} title="Menu Makanan" />     
      </div>
    );
  }
  
  export default Menu;