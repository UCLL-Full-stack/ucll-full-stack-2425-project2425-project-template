import Link from 'next/link';
import styles from "../styles/Home.module.css";

const Header: React.FC = () => {
    const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!window.confirm("Are you sure you want to log out?")) {
            e.preventDefault();
        }
    };

    return (
        <header className={styles.navbar}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink} onClick={handleLogoutClick}>
                    Logout
                </Link>
            </nav>
        </header>
    );
};

export default Header;
