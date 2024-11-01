import Link from 'next/link';
import styles from './header.module.css'


const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/cars" className={styles.link}>
          Car stock
        </Link>
        <Link href="/orders" className={styles.link}>
          Orders
        </Link>
        <Link href="/parts" className={styles.link}>
          Part stock
        </Link>
      </nav>
    </header>
  );
};

export default Header;
