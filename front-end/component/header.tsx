import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className=" inset-0 bg-gradient-to-br from-gray-400 to-gray-100 flex flex-col items-center">
      <nav className="flex justify-between container mx-auto p-8">
        <Link
          href="/"
          className=" px-4 text-xl text-white  hover:bg-gray-400 rounded-lg"
        >
          <img src="/images/home.svg" alt="Home" width={35} height={35} />
        </Link>

        <Link
          href="/jobs"
          className="flex items-center px-4 text-xl text-black  hover:bg-gray-400 rounded-lg"
        >
          Jobs
        </Link>

        <Link
          href="/skills"
          className="flex items-center px-4 text-xl text-black  hover:bg-gray-400 rounded-lg"
        >
          Skills
        </Link>

        <Link
          href="/user"
          className=" px-4 text-xl text-white  hover:bg-gray-400 rounded-lg"
        >
          <img src="/images/user.svg" alt="User" width={40} height={40} />
        </Link>
      </nav>
    </header> 
  );
};

export default Header;
