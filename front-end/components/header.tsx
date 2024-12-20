import React, { useEffect, useState } from "react";
import Link from "next/link";
import Language from "./language/Language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    console.log(user);
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser)
      setLoggedInUser(parsedUser.role);
      console.log(loggedInUser)

    }
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
    "/banners/drunkbanner.gif",
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleBannerClick = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header style={{ textAlign: "center", padding: "16px" }}>
      <img
        src={banners[currentBannerIndex]}
        alt="Sip Happens Online"
        style={{ width: "1000px", height: "140px", cursor: "pointer" }}
        onClick={handleBannerClick}
      />
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5px",
        }}
      >
        <Link href="/">
          <button className="navbarbutton-stylah">{t("header.home")}</button>
        </Link>
        <Link href="/cocktails/">
          <button className="navbarbutton-stylah">{t("header.cocktails")}</button>
        </Link>
        <Link href="/favorites/">
          <button className="navbarbutton-stylah">{t("header.favorites")}</button>
        </Link>
        <Link href="/addcocktail/">
          <button className="navbarbutton-stylah">{t("header.addCocktail")}</button>
        </Link>
        
        {!loggedInUser ? (
          <Link href="/login/">
            <button className="navbarbutton-stylah">{t("header.login")}</button>
          </Link>
        ) : (
          <>
            <a href="/login" onClick={handleClick} className="navbarbutton-stylah">
              {t("header.logout")}
            </a>
            <div className="navbarbutton-stylah">
              {t("header.welcome")}, {loggedInUser}!
            </div>
          </>
        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
