import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.titleLink}>
                <div className={styles.logoContainer}>
                    <Image
                        src="/images/white-logo.png"
                        alt="White Logo"
                        className={styles.vercelLogo}
                        width={50}
                        height={50}
                    />
                    <h1 className={styles.title}>Spilled Popcorn</h1>
                </div>
            </Link>

            <Link href="/register">
                <button className={styles.registerButton}>Register</button>
            </Link>

            <Link href="/login">
                <button className={styles.registerButton}>Login</button>
            </Link>      

            <Link href="/movie">
                <button className={styles.registerButton}>Movies</button>
            </Link>

        </header>
    );
};

export default Header;
