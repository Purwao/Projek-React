import React from "react";
import Ombak from "../components/Ombak";

function Login() {
    function showPass() {
        var pass = document.getElementById("password");
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }
    }
    return (
        <div>
            <Ombak />
            <div className=" w-screen h-screen senja ">
                <div className=" h-screen w-1/3 bg-black border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-3xl bg-opacity-50 relative">
                    <div className="py-7 mx-auto">
                        <h1 className="font-bold text-5xl mb-7 font-sans text-center text-white">Login</h1>
                        <div>
                            <form className="" action="">
                                <label htmlFor="" className=" hover:text-blue-600 hover:border-blue-600 hover:duration-700 ease-in-out ps-2 border-s-8 border-white text-white text-lg duration-300 transform translate-y-6 scale-75 top-3">Username</label>
                                <br />
                                <input type="email" className="mt-2 px-5 block w-full py-2.5 text-lg text-white rounded-xl  bg-gray-300 bg-opacity-30  border-b-2 border-gray-100 appearance-none dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 focus:bg-blue-600 focus:bg-opacity-25 peer transition ease-in-out duration-500" />
                                <br />
                                <div>
                                    <div>
                                        <div>
                                            <label htmlFor="password" className="hover:text-blue-600 hover:border-blue-600 hover:duration-700 ease-in-out ps-2 border-s-8 border-white text-white text-lg duration-300 transform translate-y-6 scale-75 top-3">Password</label><br />
                                            <input type="password" id="password" className="mt-2 px-5 block w-full py-2.5  text-lg text-white rounded-xl bg-gray-300 bg-opacity-30 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 focus:bg-blue-600 focus:bg-opacity-25 peer transition ease-in-out duration-500" />
                                            <i onClick={showPass} className="text-white hover:underline text-right  duration-300 ease-in-out focus:outline-none"><i>Show Password</i></i>
                                        </div>

                                    </div>
                                </div>
                                <br />
                                <button className="bg-gray-300 bg-opacity-30  hover:bg-blue-300 hover:text-black transition ease-linear duration-300 block w-full  text-white font-semibold py-2 px-4 border opacity-75 border-white rounded shadow focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                                <div className="flex justify-between items-center">
                                    < a href="#a" className="text-white text-lg hover:underline"><i>Forgot Password?</i></a>
                                    <span className="text-gray-100">Don't have an account? <a href="#a" className="text-white text-lg hover:underline"><i>Register Here</i></a></span>
                                </div>
                            </form>
                        </div>
                     </div>
                    <footer className="   p-8 0  fixed left-0 right-0 bottom-0">
                            <div className="w-full max-w-screen-xl mx-auto">
                            
                                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                                <div className="text-sm text-gray-500  dark:text-gray-400">
                                            <span className="">&copy; Societyco.  All Rights Reserved.  </span>
                                            <span>  </span>
                                    </div>
                         
       
                            </div>
                        </footer>
                </div>
            </div>
        </div>
    );
}

export default Login;
