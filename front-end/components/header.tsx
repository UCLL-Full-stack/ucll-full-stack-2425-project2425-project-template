import Link from 'next/link';
import Language from './language';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState<string>('guest'); // Default role is 'guest'

  // Fetch the logged-in user's role from localStorage or another state management method
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        setRole(parsedUser.role); // Set the role from the stored user data
      }
    }
  }, []);

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {t('app.title')}
      </a>
      <nav className="nav justify-content-center">
        {/* Common Links */}
        <Link href="/login" className="nav-link px-4 fs-5 text-white">
          {t('header.login')}
        </Link>

        {/* Trainer-specific Links */}
        {role === 'trainer' && (
          <>
            <Link href="/pokemons" className="nav-link px-4 fs-5 text-white">
              {t('header.pokemon')}
            </Link>
            <Link href="/calendar" className="nav-link px-4 fs-5 text-white">
              {t('header.calender')}
            </Link>
            <Link href="/badges" className="nav-link px-4 fs-5 text-white">
              {t('header.badges')}
            </Link>
          </>
        )}

        {/* Nurse-specific Links */}
        {role === 'nurse' && (
          <>
            <Link href="/pokemons" className="nav-link px-4 fs-5 text-white">
              {t('header.pokemon')}
            </Link>
          </>
        )}

        {/* Language Switcher */}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
