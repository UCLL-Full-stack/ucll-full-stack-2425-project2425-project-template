import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { useEffect, useState } from "react";
const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className={` p-3 mb-3 border-bottom ${styles["custom-gradient"]}`}>
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white text-decoration-none">
        Eventer
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/events" className="nav-link px-4 fs-5 text-white">
          Events
        </Link>
        {!loggedInUser && (
          <>
            <Link href="/register" className="nav-link px-4 fs-5 text-white">
              Register
            </Link>
            <Link href="/login" className="nav-link px-4 fs-5 text-white">
              Login
            </Link>
          </>
        )}
        {loggedInUser && (
          <>
            <Link href="/login" onClick={handleLogout}>
              Logout
            </Link>
            <p>Welcome {loggedInUser}</p>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
