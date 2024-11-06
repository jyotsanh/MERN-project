import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
export default function Home2ndCompo(){
    useEffect(() => {
       console.log("Home2ndCompo is mounted"); 
    },[])
    return (
        <>
            <section className="two-image-section py-8 px-4 md:px-12 bg-gray-50">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">
                Elevate Your Look with Our Signature Features
                </h2>
                <div className="image-description grid grid-cols-1 md:grid-cols-2 ">
                    {/* First Image Block */}
                    <div className="image-text flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 md:w-1/4 h-64">
                        <img
                        src="/webp/img5.webp"
                        alt="Ultra-lightweight Frames"
                        className="eyeglasses w-full md:w-1/4 h-64 object-cover"
                        />
                        <div className="description1 flex-1 p-4 text-center md:text-center md:ml-7">
                            <h3 className="text-lg font-medium text-gray-700 md:text-center md:ml-7  md:w-10">
                                Ultra-lightweight Frames <br /> for Maximum Comfort
                            </h3>
                            <Link to="/Sunglasses">
                                <button className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-lg hover:from-orange-500 hover:to-blue-600 transition-colors duration-200">
                                View More
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Second Image Block */}
                    <div className="image-text flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img
                        src="/webp/img1.webp"
                        alt="Trendy Designs with UV Protection"
                        className="polarized-glasses w-full md:w-1/2 h-64 object-cover"
                        />
                        <div className="description flex-1 p-4 text-center md:text-left">
                            <h3 className="text-lg font-medium text-gray-700 md:p-1 ml-2">
                                Trendy Designs with  <br />UV Protection
                            </h3>
                            <Link to="/Sunglasses">
                                <button className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-lg hover:from-orange-500 hover:to-blue-600 transition-colors duration-200">
                                View More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}