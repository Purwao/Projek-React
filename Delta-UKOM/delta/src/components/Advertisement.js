import React from 'react'
import Carousel from "../components/Carousel";



function Advertisement() {
  return (
    <div>
        <div className=" contain w-screen h-80  bg-deepkoamaru bgiwak flex flex-row justify-between items-center px-20  py-20">
        <div className=" w-4/12">
          <Carousel></Carousel>
        </div>
        <div className="w-3/5 text-white text-right">
        <h1 className=" text-3xl font-bold mb-2 font-GI">
              | Dive into Savings - Limited Time Offer!
            </h1>
            <p className="text-md mb-6 font-HSR">
            Jangan lewatkan penjualan eksklusif kami! Untuk waktu terbatas, 
            nikmati diskon hingga 50% untuk berbagai pilihan ikan segar dan bersumber lestari.
            Baik Anda merencanakan pesta hidangan laut atau menyiapkan persediaan untuk restoran Anda, 
            sekarang adalah waktu yang tepat untuk berhemat banyak!
           
            </p>
        </div>
      </div>
    </div>
  )
}

export default Advertisement