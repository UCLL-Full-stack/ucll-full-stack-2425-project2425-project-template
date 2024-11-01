import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className=" inset-0 flex flex-col items-center bg-white">
      <nav className="flex justify-between container mx-auto p-8 bg-white">
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
      </nav>
    </header>
  );
};

export default Header;
