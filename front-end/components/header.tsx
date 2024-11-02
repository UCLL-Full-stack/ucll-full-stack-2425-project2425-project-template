import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <nav className="nav justify-content-center">
        <ul>
          <li>
            <Link href="/" className="nav-link px-4 fs-5 text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/teams" className="nav-link px-4 fs-5 text-white">
              Teams
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;