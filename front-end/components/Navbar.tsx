import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useTranslation } from 'next-i18next';
import Language from './language/Language';

const Navbar: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            const parsedStudent = JSON.parse(user);
            setLoggedInUser(parsedStudent.username);
            console.log("Logged-in user from local storage:", parsedStudent.username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        console.log("User logged out and local storage cleared");
    }
    
    return (
        <nav className={styles.navbar}>
            <ul className={styles['navbar-links']}>
                <li>
                    <Link href="/">
                        {t("nav.thuis")}
                    </Link>
                </li>
                <li>
                    <Link href="/trips">
                        {t("nav.trips")}
                    </Link>
                </li>
                <li>
                    <Link href="/bookings">
                        {t("nav.boekingen")}
                    </Link>
                </li>
                {loggedInUser ? (
                    <>
                    <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                        {`${t("nav.welkom")} ${loggedInUser}`}!
                    </div>
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}>
                        {t("nav.logout")}
                    </button>
                </>
                ) : (
                <Link
                    href="/login"
                    className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
                >
                    {t("nav.login")}
                </Link>
                )}

                <div className={styles.languageButton}>
                    <Language />
                </div>
            </ul>
            
        </nav>
    );
};

export default Navbar;
