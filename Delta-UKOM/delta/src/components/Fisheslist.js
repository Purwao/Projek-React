import React, { useState }  from 'react'
import { link } from "../Axios/link";
import { useForm } from 'react-hook-form';


function Fisheslist() {
  const { register, handleSubmit, reset } = useForm();
  const [filter,setFilter]=useState();

  

function search1(data){
  const formData = new FormData();
  formData.append("ukuran", data.ukuran);
  formData.append("habitat", data.habitat);
  link.post("search1",formData).then((res) => {
   
   
    if (res.data !== "") {
       console.log(res.data);
       setFilter(res.data)
       
    
    } else {
      alert("Data ikan tidak ditemukan.");
    }
  });
console.log(filter)
}




  return (
    <div>
      <div className='bg-deepkoamaru bgiwak bg-contain w-screen h-screen flex flex-row justify-between items-center px-24'>
      <div className=''>
      <form onSubmit={handleSubmit(search1)} >
        <div className='flex'>
          <div>
        <label className='block m-2 text-md font-medium text-floralwhite'>
          Ukuran Ikan:
          <select {...register("ukuran", { required: true })}  id='ukuran'  name='ukuran' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-24 p-2 '>
            <option value="">Pilih ukuran</option>
            <option value="20">Kecil</option>
            <option value="50">Sedang</option>
            <option value="100">Besar</option>
          </select>
        </label>
      </div>
      <div>
        <label className='block m-2 text-md font-medium text-floralwhite ' >
          Habitat:
          <select id='habitat' {...register("habitat", { required: true })} name='habitat' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-24 p-2 '>
            <option value="">Pilih habitat</option>
            <option value="Air Tawar">Air Tawar</option>
            <option value="Air Laut">Air Laut</option>
            <option value="Air Asin">Air Asin</option>
          </select>
        </label>
      </div>
        </div>
      
      <button className='inline-flex items-center px-5 py-3 text-lg font-medium text-center bg-floralwhite text-deepkomaru hover:bg-deepkoamaru hover:text-floralwhite hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded w-56' type="submit">Submit</button>
    </form>
      </div>
      <div className=' h-4/6 w-5/6 bg-herowhite flex justify-center items-center'>

           {!filter ? (
              <div className='w-3/5  '>
           <h1 className="text-4xl md:text-5xl font-bold mb-2 font-GI">
           Explore Our Fish Categories
            </h1>
            <p className="text-lg md:text-xl mb-6 font-HSR">
            Telusuri beragam kategori kami untuk menemukan ikan yang sempurna untuk kebutuhan Anda. 
            Baik Anda mencari ikan hasil tangkapan liar, 
            hasil budidaya, atau jenis ikan tertentu seperti salmon, tuna, atau kerang, kami memiliki semuanya.
            </p>
          </div>
            ) :(
              <div className="w-full h-full grid grid-cols-4 ">
                {filter.map((value, index) => (
                  <div
                    className=" bg-deepkoamaru border mx-10 mt-5 rounded-lg shadow h-60 w-72 "
                    id="wrapper-item"
                  >
                    <img
                      className=" mx-auto min-w-36 max-h-32 min-h-24  rounded-b-lg "
                      src={value.gambar}
                      alt="..."
                    />
                    <div className="p-2">
                      <div className="flex justify-between items-center">
                        <small className=" font-extralight text-white text-lg">
                          Kategori: {value.habitat}
                        </small>

                        <p className=" font-normal text-white text-lg">
                          Rp. {value.hargaumum}/Kg
                        </p>
                      </div>
                      <div className="flex justify-evenly items-center mt-4">
                        <h5 className=" text-4xl font-bold tracking-tight text-white">
                          {value.ikan}
                        </h5>
                        <br />
                        <button
                          // onClick={() => {
                          //   showModal4(value.id);
                          //   document.getElementById(
                          //     "pembayaran-berhasil"
                          //   ).style.display = "none";
                          //   document.getElementById(
                          //     "pembayaran-gagal"
                          //   ).style.display = "none";
                          // }}
                          className="inline-flex items-center px-5 py-1 text-lg font-medium text-center bg-deepkoamaru text-floralwhite hover:bg-floralwhite hover:text-deepkoamaru hover:border-deepkoamaru border-2 transition duration-300 ease-linear rounded-lg "
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) }
             

          

          
           
      </div>
      </div>
    </div>
     
  )
}

export default Fisheslist