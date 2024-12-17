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
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/cars" className={styles.link}>
          Car stock
        </Link>
        <Link href="/orders" className={styles.link}>
          Orders
        </Link>
        <Link href="/parts" className={styles.link}>
          Part stock
        </Link>
        {loggedInUser ? (
          <>
            <div className="p-2 fs-6 mt-1 ml-6 text-[#ff642b] italic">
              {("Welcome")}, {loggedInUser.email}!
            </div>
            <Link
              href="/login"
              className="p-2 m-1 fs-6 text-white bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md "
              onClick={() => {
                sessionStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInUser");
                setLoggedInUser(null);
              }}
            >
              {" "}
              {("logout")}
            </Link>
          </>
        ):(
          <Link href="/login" className="p-2 m-1 fs-6 text-white bg-[#ff8921] hover:bg-[#ff642bbb] rounded-md">
            Login
          </Link>
        )}
      </nav>
    </header>
    </>
  );
};

export default Header;
