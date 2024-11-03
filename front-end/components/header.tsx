import Link from 'next/link';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div>
          <Link href="/account" className={styles.accountLink}>Account</Link>
        </div>
        
        <div className={styles.middleLinks}>
          <Link href="/pc-builder" className={styles.pcBuilderLink}>PC Builder</Link>
          <Link href="/orders" className={styles.ordersLink}>Orders</Link>
        </div>
        
        <div>
          <Link href="" className={styles.logoutLink}>Logout</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
