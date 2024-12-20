import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Language from "@components/language/Language";
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

  const gotoSetings = () => {
    window.location.href = '/mysubmissions';
  }

  const gotoMysubmissions = () => {
    window.location.href = '/mysubmissions';
  }

  return (
    <>
      <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
        <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
          {t('general.title')}
        </a>
        <nav className="nav justify-content-center align-items-center">
          <Link href="/" className="nav-link px-4 fs-5 text-white">
            {t('header.home')}
          </Link>
          <Link href="/overview" className="nav-link px-4 fs-5 text-white">
            {t('header.informationOverview')}
          </Link>
          {loggedInUser ? (
            <>
              {loggedInUser.permission === 'ADMIN' ? (
                <React.Fragment>
                  <Link href="/user_administration" className="nav-link px-4 fs-5 text-white btn btn-link">Overview Users</Link>
                  <Link href="/submission_administration" className="nav-link px-4 fs-5 text-white btn btn-link">Overview Submissions</Link>
                </React.Fragment>
              ) : (
                <Link href="/submission_form" className="nav-link px-4 fs-5 text-white btn btn-link">
                  {t('header.submissionForm')}
                </Link>
              )}
              <div className="dropdown nav-link px-4 fs-5 text-white btn btn-link">
                <button className="dropbtn">{loggedInUser.username}</button>
                <div className="dropdown-content">
                  <button onClick={gotoSetings}>Account Setings</button>
                  <button onClick={gotoMysubmissions}>{t('header.mysubmissions')}</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login" className="nav-link px-4 fs-5 text-white btn btn-link">
              {t('header.login')}
            </Link>
          )}
        </nav>
        <Language />
      </header>
      <style jsx>{`
        .dropbtn {
          background-color:rgb(74, 115, 195);
          color: white;
          padding: 16px;
          font-size: 16px;
          border: none;
          padding: 0;
          min-width: 180px;
          height: 48px;
        }
        
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f1f1f1;
          min-width: 180px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
        
        .dropdown-content button{
          font-size: 16px;  
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          width: 180px
        }

        .dropdown-content Link{
          font-size: 16px;  
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          width: 100%
        }
        
        .dropdown-content button:hover {background-color: #ddd;}
        
        .dropdown:hover .dropdown-content {display: block;}
        
        .dropdown:hover .dropbtn {background-color:rgb(58, 76, 189);}
      `}</style>
    </>
  );
};

export default Header;
