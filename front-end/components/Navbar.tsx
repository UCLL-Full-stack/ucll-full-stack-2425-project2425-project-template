import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useTranslation } from 'next-i18next';

const Navbar: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        setLoggedInUser(user);
        console.log("Logged-in user from session storage:", user);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        console.log("User logged out and session storage cleared");
    }
    
    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-logo']}>
                <h1>EuroStudent Travel</h1>
            </div>
            <ul className={styles['navbar-links']}>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/trips">
                        Trips
                    </Link>
                </li>
                <li>
                    <Link href="/bookings">
                        Bookings
                    </Link>
                </li>
                {loggedInUser ? (
                    <>
                    <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                        Welcome, {loggedInUser}!
                    </div>
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}>
                        Logout
                    </button>
                </>
                ) : (
                <Link
                    href="/login"
                    className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
                >
                    Login
                </Link>
                )}
                    </ul>
        </nav>
    );
};

export default Navbar;
