import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/home.module.css"

const Header: React.FC = () => {

    const [loggedInUser, setLoggedInUser] = useState<String|null>(null);
    
    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        window.location.href="/"
    };

    return (
        <header className={styles.header}>
            <a className={styles.title}>
                TeamTracker
            </a>

            <nav className={styles.nav}>
                <Link href="/" className={styles.card}>
                    Homepage
                </Link>

                {!loggedInUser && (
                    <Link
                        href="/login"
                        className={styles.card}>
                        Login
                    </Link>
                )}

                {loggedInUser && (
                    <>
                        <Link href="/training" className={styles.card}>
                            Trainings
                        </Link>
                        <Link href="/team" className={styles.card}>
                            Teams
                        </Link>
                        <Link href="/match" className={styles.card}>
                            Matches
                        </Link>
                                
                        <a
                            href="#"
                            onClick={handleClick}
                            className={styles.card}
                        > Logout </a>
                    </>
                )}
                
                {loggedInUser && (
                    <a
                        href="/user"
                        className={styles.card}>
                        Profile
                    </a>
                )}

                {loggedInUser && (
                    <p>|</p>
                )}

            </nav>
        </header>
    )
}

export default Header;