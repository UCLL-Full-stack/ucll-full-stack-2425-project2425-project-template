import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    // Retrieve logged-in user's info
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    //confirmation popup
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      // Remove logged-in user's info
      localStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
      window.location.href = '/';
    }
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
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
        {loggedInUser ? (
          <button onClick={handleLogout} className="nav-link px-4 fs-5 text-white btn btn-link">
            Logout
          </button>
        ) : (
          <Link href="/login" className="nav-link px-4 fs-5 text-white">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
