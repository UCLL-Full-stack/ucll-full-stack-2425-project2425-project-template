import Link from "next/link";
import { useState } from "react";


const Header: React.FC = () => {
  return (
    <header className=" inset-0 grid grid-cols-3 bg-[#40444F] ">
      <nav className="flex col-span-2 ml-36 justify-left text-white container mx-auto p-6">
          <Link
            href="/"
            className=" flex items-center px-4 text-xl font-bold text-white hover:text-[#FCBA04] transition duration-300"
            
          >
            Home
          </Link>

          <Link
            href="/vehicles"
            className="flex items-center px-4 text-xl font-bold text-white hover:text-[#FCBA04] transition duration-300"
          >
            Vehicles
          </Link>
          <Link
            href="/users"
            className=" flex items-center px-4 text-xl font-bold text-white hover:text-[#FCBA04] transition duration-300"
          >
            User
          </Link>

       
      </nav>

      <div className="flex col-span-1 mr-36 justify-end gap-3 container mx-auto p-6">
          <div className="flex">
            <Link
            href="/login"
            className="flex items-center px-4 py-2 text-lg font-medium text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500">
            Log In
            </Link>
          </div>

          <div className="flex">
          <Link
            href="/signup"
            className="flex items-center px-4 py-2 text-lg font-medium text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500">
            Sign Up
            </Link>
          </div>
      </div>

     
    </header>
  );
};

export default Header;


// #62A87C mint color

