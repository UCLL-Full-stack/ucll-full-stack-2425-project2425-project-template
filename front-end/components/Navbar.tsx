import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useTranslation } from 'next-i18next';
import Language from './language/Language';
import { User } from '@/types';

const Navbar: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

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
                        <div className={styles['navbar-item']}>
                            {`${t("nav.welkom")} ${loggedInUser.fullname}!`}
                        </div>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
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
