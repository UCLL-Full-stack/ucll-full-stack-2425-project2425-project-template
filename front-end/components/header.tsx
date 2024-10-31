import Link from 'next/link';
import styles from '@styles/header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div>
                <Link href="/" className={styles.logo}>
                    <img src={"/images/logo.png"} alt={"logo"} />
                </Link>
            </div>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <Link href="/store" className={styles.link}>
                        Store
                    </Link>
                    <Link href="/library" className={styles.link}>
                        Library
                    </Link>
                    <Link href="/profile" className={styles.link}>
                        Profile
                    </Link>
                </nav>
            </div>
            <div>
                <Link href="/" className={styles.balance}>
                    Balance: €99.99
                </Link>
            </div>
        </header>
    );
};

export default Header;
