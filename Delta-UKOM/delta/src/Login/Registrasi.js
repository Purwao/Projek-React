import React, { useState } from "react";
import Ombak from "../components/Ombak";
import { useForm } from "react-hook-form";
import { link } from "../Axios/link";
import { redirect, useNavigate } from "react-router-dom";


function Registrasi() {
    
    const{
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    }= useForm();
    
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const getToken = () => (sessionStorage.getItem('token'))
    const navigate=useNavigate();
    const setOtpSent = () => (setIsOtpSent(true));

    function registrasi(data) {
 
        const formData=new FormData();
        formData.append("email",data.email)
        formData.append("password",data.password)
       
        link.post('reg',formData).then(res=>{
      
            sessionStorage.setItem('token', res.data.data.api_token)
            sessionStorage.setItem('email', res.data.data.email)
            sessionStorage.setItem('level', res.data.data.level)
            sessionStorage.setItem('idpelanggan', res.data.data.id)
            
            console.log(res)
            if (getToken() !== 'undefined') {
                sendOtp(data);
            }
        })
        reset();
    }

    function sendOtp(data) {
        const formData=new FormData();
        formData.append("email",data.email);
        setEmail(data.email)
        setOtpSent();
          link.post('sendotp',formData).then(res => {
           console.log(res);
        }).catch(errors);
    }

    function verifyOtp(data) {
        const formData=new FormData(data);
        formData.append("email",email);
        link.post('verifyotp', { email, otp }).then(res => {
            console.log(res);
            if (res.data.status == 200) {
                if (sessionStorage.getItem('level') == 1 ||sessionStorage.getItem('level') == 2 ||sessionStorage.getItem('level') == 3) {
                    navigate('/admin');
                } else {
                    navigate('/market');
                }
            } else {
                alert('Invalid OTP');
            }
        }).catch(errors);
    }

    function showPass() {
        var pass = document.getElementById("password");
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }
    }
  return (
    <div >
    <Ombak />
    <div >
    
    <div className="w-screen h-screen flex flex-row justify-center items-center senja">
        <div className=" w-2/5   bg-floralwhite border border-slate-400 rounded-3xl p-8 fixed">
           
                {!isOtpSent ? ( <div className=" mx-auto">
                <h1 className="font-bold text-4xl mb-7 font-sans text-center text-deepkoamaru">Registrasi</h1>
                <div>
                              <form className="" action="" onSubmit={handleSubmit(registrasi)}>
                              <label htmlFor="" className=" hover:text-blue-600 hover:border-blue-600 hover:duration-700 ease-in-out ps-2 border-s-8 border-white text-deepkoamaru text-sm duration-300 transform translate-y-6 scale-75 top-3">Email</label>
                              <br />
                              <input type="email"  {...register("email", { required: true })} id="email" className="mt-2 px-5 block w-full py-2.5 text-sm text-deepkoamaru rounded-xl  bg-gray-300 bg-opacity-30  border-b-2 border-gray-100 appearance-none dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:text-deepkoamaru focus:border-blue-600 focus:bg-blue-600 focus:bg-opacity-25 peer transition ease-in-out duration-500" />
                              {errors.email && (
                <p className="text-red-500">Please Insert Your Email !</p>
              )}
                              <br />
                              <div>
                                  <div>
                                      <div>
                                          <label htmlFor="password" className="hover:text-blue-600 hover:border-blue-600 hover:duration-700 ease-in-out ps-2 border-s-8 border-white text-deepkoamaru text-sm duration-300 transform translate-y-6 scale-75 top-3">Password</label><br />
                                          <input  {...register("password", { required: true })} type="password" id="password" className="mt-2 px-5 block w-full py-2.5 text-sm text-deepkoamaru rounded-xl bg-gray-300 bg-opacity-30 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:text-deepkoamaru focus:border-blue-600 focus:bg-blue-600 focus:bg-opacity-25 peer transition ease-in-out duration-500" />
                                          {errors.password && (
                <p className="text-red-500">Password is needed</p>
              )}
                                          <i onClick={showPass} className="text-deepkoamaru text-sm underline hover:no-underline text-right  duration-300 ease-in-out focus:outline-none float-end mb-7"><i>Show Password</i></i>
                                      </div>

                                  </div>
                              </div>
                              <br />
                              <button className="bg-deepkoamaru bg-opacity-90  hover:bg-blue-200 hover:text-gray-800 transition ease-linear duration-300 block w-full  text-gray-200 font-semibold py-2 px-4 border opacity-75 border-white rounded shadow focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                              <div className="flex justify-around items-center mt-4 ">
                                  <span className="text-deepkoamaru">Belum punya akun? <a href="/regist" className="text-deepkoamaru text-sm underline hover:no-underline"><i>Register Here</i></a></span>
                              </div>
                          </form> </div>
             </div>
        
                        ) : (
                            <div><div className=" mx-auto">
                            <h1 className="font-bold text-4xl mb-7 font-sans text-center text-deepkoamaru">One-Time Password(OTP)</h1>
                            <h1 className="font-thin text-sm mb-7 font-sans text-center text-grey">Kode OTP yang dikirim mengandung 6 angka</h1>
                            <div>
                                {/* OTP Input Field */}
                                <label htmlFor="otp" className="hover:text-blue-600 hover:border-blue-600 hover:duration-700 ease-in-out ps-2 border-s-8 border-white text-deepkoamaru text-sm duration-300 transform translate-y-6 scale-75 top-3">Enter OTP</label>
                                <br />
                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} id="otp" className="mt-2 px-5 block w-full py-2.5 text-sm text-deepkoamaru rounded-xl bg-gray-300 bg-opacity-30 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:text-deepkoamaru focus:border-blue-600 focus:bg-blue-600 focus:bg-opacity-25 peer transition ease-in-out duration-500"  />
                                <br />
                                <button onClick={()=>{verifyOtp()}} className="bg-deepkoamaru bg-opacity-90  hover:bg-blue-200 hover:text-gray-800 transition ease-linear duration-300 block w-full  text-gray-200 font-semibold py-2 px-4 border opacity-75 border-white rounded shadow focus:outline-none focus:shadow-outline">Verify OTP</button>
                            </div></div>
             </div>
                        )}

                 
               
        </div>
    </div>
    </div>
   
</div>
  )
}

export default Registrasi