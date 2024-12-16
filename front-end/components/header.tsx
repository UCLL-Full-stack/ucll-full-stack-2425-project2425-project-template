import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { User } from '@types';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const handleClick = async () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };
    return (
        <header className={styles.navbar}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    Home
                </Link>
                <Link href="/species" className={styles.navLink}>
                    Species
                </Link>
                {loggedInUser && (
                    <Link href="/animals" className={styles.navLink}>
                        Animals
                    </Link>
                )}
                {loggedInUser &&
                    (loggedInUser.role === 'admin' || loggedInUser.role === 'manager') && (
                        <Link href="/expenses" className={styles.navLink}>
                            Expenses
                        </Link>
                    )}
                {loggedInUser && loggedInUser.role === 'admin' && (
                    <Link href="/users" className={styles.navLink}>
                        Admin Dashboard
                    </Link>
                )}
                {!loggedInUser && (
                    <Link href="/login" className={styles.navLink}>
                        Login
                    </Link>
                )}
                {loggedInUser && (
                    <a href="/login" className={styles.navLink} onClick={handleClick}>
                        Logout
                    </a>
                )}
                {loggedInUser && (
                    <div className="px-4 text-white nav-link fs-5">
                        Welcome, {loggedInUser.username}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
