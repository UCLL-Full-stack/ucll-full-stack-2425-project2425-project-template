import Link from 'next/link';
import styles from '@/styles/Home.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a>
        Personal Finance Tracker
      </a>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/users/register">
          Register
        </Link>
        <Link href="/users/login">
          Log in
        </Link>
        {/* <Link href="/" className="nav-link px-4 fs-5 text-white">
          Accounts
        </Link> */}
      </nav>
    </header>
  );
};

export default Header;
