import React from 'react';
import logo from '../../assets/Patan.png'

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-center py-2 sticky bottom-0 capitalize px-4">
      <div className="flex justify-center">
        <div className="">
          <div className="w-16 h-16 md:w-20 md:h-20  bg-blue-500 rounded-full flex items-center justify-center">
            <img
              className='bg-gray-950 rounded-full w-[90%] h-[90%]'
              src={logo}
              alt="logo" />
            {/* <span className="text-black font-bold text-2xl">K</span> */}
          </div>
        </div>
        <div className="">
          <h1 className="md:text-3xl text-xl font-extrabold tracking-tight">
            <span className="text-black">Bibek </span>
            <span className="text-blue-700">Kumar </span>
            <span className="text-black">Kushwaha </span>
          </h1>
          <div className="font-bold text-purple-700 mt-1">+977 9864067038</div>
          <div className="mt-1 text-sm text-gray-700">
            © {new Date().getFullYear()} Bibek Kumar Kushwaha. All rights reserved.
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
