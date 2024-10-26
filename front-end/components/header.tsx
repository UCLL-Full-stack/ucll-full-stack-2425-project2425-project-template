import Link from "next/link";
import styles from "@/styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={` p-3 mb-3 border-bottom ${styles["custom-gradient"]}`}>
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white text-decoration-none">
        Eventer
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/events" className="nav-link px-4 fs-5 text-white">
          Events
        </Link>
      </nav>
    </header>
  );
};

export default Header;
