import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Language from "@components/language/Language";
import i18next from 'i18next';
import React from 'react';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; permission: string } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Retrieve logged-in user's info
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Confirmation popup
    const confirmed = window.confirm(t('header.logoutConfirm'));
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
        {t('general.title')}
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t('header.home')}
        </Link>
        <Link href="/overview" className="nav-link px-4 fs-5 text-white">
          {t('header.informationOverview')}
        </Link>
        {loggedInUser ? (
          <>
            <>
              {loggedInUser.permission === 'ADMIN' ? (
                <React.Fragment>
                  <Link href="/administration" className="nav-link px-4 fs-5 text-white">Overview Users</Link>
                  <Link href="/submission_form" className="nav-link px-4 fs-5 text-white">Overview Submissions</Link>
                </React.Fragment>
              ) : (
                <Link href="/submission_form" className="nav-link px-4 fs-5 text-white">
                  {t('header.submissionForm')}
                </Link>
              )}
            </>
            <button onClick={handleLogout} className="nav-link px-4 fs-5 text-white btn btn-link">
              {loggedInUser.username}
            </button>
          </>
        ) : (
          <Link href="/login" className="nav-link px-4 fs-5 text-white">
            {t('header.login')}
          </Link>
        )}
      </nav>
      <Language />
    </header>
  );
};

export default Header;
