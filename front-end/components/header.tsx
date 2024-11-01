import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-[#e60042] flex items-center justify-between h-32">
      <div className="flex-shrink-0">
        <img className="h-20 m-4" alt="logo" src="/images/logo.png" />
      </div>

      <div className="ml-auto flex flex-col">
        <nav className="md:flex-row mr-3">
          <Link
            href="/"
            className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#5c00b2]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300">
            Home
          </Link>

          <Link
            href="/leaderboard"
            className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#5c00b2]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300">
            leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
