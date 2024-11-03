import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Racing App
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/races" className="nav-link px-4 fs-5 text-white">
          Races
        </Link>
        <Link href="/submission_form" className="nav-link px-4 fs-5 text-white">
          Submission Form
        </Link>
        <Link href="/login" className="nav-link px-4 fs-5 text-white">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
