import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-brand']}>
                <h1>EuroStudent Travel</h1>
            </div>
            <ul className={styles['navbar-links']}>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/destinations">
                        Destinations
                    </Link>
                </li>
                <li>
                    <Link href="/bookings">
                        Bookings
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
