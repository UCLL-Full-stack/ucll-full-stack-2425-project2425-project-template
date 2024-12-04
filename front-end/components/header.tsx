import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';

const Header: React.FC = () => {
  const [nationalRegisterNumber, setNationalRegisterNumber] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setNationalRegisterNumber(loggedInUser.nationalRegisterNumber);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setNationalRegisterNumber(null);
  };
  return (
    <header className={styles.header}>
      <a>
        Personal Finance Tracker
      </a>
      <nav>
        {nationalRegisterNumber ? (
          <>
            <Link href={`/accounts/${nationalRegisterNumber}`}>Accounts</Link>
            <a href="/" onClick={handleLogout}>Log out</a>
            </>
            ) : (
              <>
              <Link href="/">Home</Link>
              <Link href="/users/register">
                Register
              </Link>
              <Link href="/users/login">
                Log in
              </Link>
              </>
            )}
      </nav>
    </header>
  );
};

export default Header;
