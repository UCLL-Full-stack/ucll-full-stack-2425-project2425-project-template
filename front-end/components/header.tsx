import Link from "next/link";
import { useState } from "react";


const Users: React.FC = () => {
 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogInClick = () => {
    setIsLoginModalOpen(true)
  }
  
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return void
}

const Header: React.FC = () => {
  return (
    <header className=" inset-0 flex flex-col items-center bg-white ml-10 mr-10">
      <nav className="flex justify-between container mx-auto p-6 bg-white">
        <Link
          href="/"
          className=" px-4 text-xl text-black  hover:bg-gray-400 rounded-lg p-4"
        >
          Home
        </Link>

        <Link
          href="/vehicles"
          className="flex items-center px-4 text-xl text-black  hover:bg-gray-400 rounded-lg"
        >
          Vehicles
        </Link>
        <Link
          href="/users"
          className=" flex items-center px-4 text-xl text-black  hover:bg-gray-400 rounded-lg"
        >
          User
        </Link>

        <Link
        href=""
        className="flex items-center pr-4 pl-4 text-m text-white bg-blue-500 align-middle hover:bg-blue-600 rounded-lg">
        Log In
        </Link>

        {/* px-2 h-11 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 */}
      </nav>

     
    </header>
  );
};

export default Header;
