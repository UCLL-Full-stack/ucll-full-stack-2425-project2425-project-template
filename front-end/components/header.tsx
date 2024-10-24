import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-black">
      <a className="fs-1 d-flex justify-content-center mb-2 mb-lg-0 text-white text-decoration-none">
        {' '}
        Eventora
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white-50">
          Home
        </Link>

        <Link href="/" className="nav-link px-4 fs-5 text-white-50">
          Upcoming events
        </Link>

        <Link href="/" className="nav-link px-4 fs-5 text-white-50">
          My events
        </Link>

        <Link href="/" className="nav-link px-4 fs-5 text-white-50">
          Create event
        </Link>
      </nav>
    </header>
  );
};

export default Header;