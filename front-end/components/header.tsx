import React, { useState } from 'react';

const Header: React.FC = () => {
  const banners = [
    "banners/neonbanner.png",
    "banners/firebanner.gif",
    "banners/pinkbanner.gif",
    "banners/goldbanner.png"
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
        style={{ maxWidth: '1000px', height: '140px', cursor: 'pointer' }}
        onClick={handleBannerClick}
      />
    </header>
  );
};

export default Header;
