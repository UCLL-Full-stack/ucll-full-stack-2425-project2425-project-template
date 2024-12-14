import React, { useState } from 'react';
import Link from 'next/link';
import Language from './language/Language';

const Header: React.FC = () => {
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
            Home
          </button>
        </Link>
        <Link href="http://localhost:8080/cocktails/">
          <button className="navbarbutton-stylah">
            Cocktails
          </button>
        </Link>
        <Link href="http://localhost:8080/addcocktail/">
          <button className="navbarbutton-stylah">
            Add Cocktail
          </button>
        </Link>
        <Link href="http://localhost:8080/">
          <button className="navbarbutton-stylah">
            Search
          </button>
        </Link>
        <Language />
      </nav>
    </header>
  );
};

export default Header;
