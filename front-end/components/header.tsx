import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Language from './language/Language';
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {

      const {t} = useTranslation()

      const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  
      useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
          const parsedUser = JSON.parse(user);
          setLoggedInUser(parsedUser.fullname);
        }
        // setLoggedInUser(localStorage.getItem("loggedInUser"));
        
      }, []);


  const banners = [
    "/banners/neonbanner.png",
    "/banners/firebanner.gif",
    "/banners/pinkbanner.gif",
    "/banners/goldbanner.png",
    "/banners/heartbanner.png",
    "/banners/neonbanner.png",
    "/banners/firebanner.gif",
    "/banners/pinkbanner.gif",
    "/banners/goldbanner.png",
    "/banners/heartbanner.png",
    "/banners/drunkbanner.gif"
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleBannerClick = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header style={{ textAlign: 'center', padding: '16px' }}>
      <img
        src={banners[currentBannerIndex]}
        alt="Sip Happens Online"
        style={{ width: '1000px', height: '140px', cursor: 'pointer' }}
        onClick={handleBannerClick}
      />
      
      {/* De coole navbar */}
      <nav style={{ display: 'flex', justifyContent: 'center',paddingTop: '5px'}}>
        <Link href="http://localhost:8080/">
          <button className="navbarbutton-stylah">
            {t('header.home')}
          </button>
        </Link>
        <Link href="http://localhost:8080/cocktails/">
          <button className="navbarbutton-stylah">
          {t('header.cocktails')}
          </button>
        </Link>
        <Link href="http://localhost:8080/addcocktail/">
          <button className="navbarbutton-stylah">
            {t('header.addCocktail')}
          </button>
        </Link>
        <Link href="http://localhost:8080/">
          <button className="navbarbutton-stylah">
            {t('header.search')}
          </button>
        </Link>
        {!loggedInUser && (
        <Link href="http://localhost:8080/login/">
          <button className="navbarbutton-stylah">
            {t('header.login')}
          </button>
        </Link>
      )}
       {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="navbarbutton-stylah"
          >
            {t("header.nav.logout")}
          </a>
        )}
        {loggedInUser && (
          <div className="navbarbutton-stylah">
            {t("header.welcome")}, {loggedInUser}!
          </div>

        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
