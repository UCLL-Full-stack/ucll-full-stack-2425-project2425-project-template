import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

const Header: React.FC = () => {
  const [nationalRegisterNumber, setNationalRegisterNumber] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (loggedInUser.nationalRegisterNumber) {
      setNationalRegisterNumber(loggedInUser.nationalRegisterNumber);
      setUserId(loggedInUser.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setNationalRegisterNumber(null);
    setUserId(null);
  };

  return (
    <header className={styles.header}>
      <a>
        Personal Finance Tracker
      </a>
      <nav>
        {nationalRegisterNumber ? (
          <>
            <Link href={`/transactions/overview/user/${userId}`}>Transaction overview</Link>
            <Link href={`/accounts/${nationalRegisterNumber}`}>Accounts</Link>
            <a href="/" onClick={handleLogout}>Log out</a>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
            <Link href="/users/register">Register</Link>
            <Link href="/users/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
