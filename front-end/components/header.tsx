import Link from "next/link";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { User } from "@/types";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <header className="bg-[#2c2c2c] p-1 font-sans">
        <nav className="flex items-center justify-center hover-blue-500">
          {loggedInUser ? (
            <>
              <Link href="/" className="text-black p-2 mx-2 font-semibold bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md">
                Home
              </Link>
              <Link href="/cars" className="text-black p-2 mx-2 font-semibold bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md">
                Car stock
              </Link>
              <Link href="/orders" className="text-black p-2 mx-2 font-semibold bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md">
                Orders
              </Link>
              <Link href="/parts" className="text-black p-2 mx-2 font-semibold bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md">
                Part stock
              </Link>
              <div className="p-2 fs-6 mt-1 ml-6 text-[#ff642b] italic under">
                {"Welcome"}, {loggedInUser.email.replace("@carshop.be", "")}!
              </div>
              <Link
                href="/login"
                className="p-2 m-1 fs-6 text-black font-semibold bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md "
                onClick={() => {
                  sessionStorage.removeItem("loggedInUser");
                  localStorage.removeItem("loggedInUser");
                  setLoggedInUser(null);
                }}
              >
                {" "}
                {"logout"}
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="p-2 m-1 fs-6 text-black bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
