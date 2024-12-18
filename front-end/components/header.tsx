import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';
import Language from "./language/Language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [nationalRegisterNumber, setNationalRegisterNumber] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setNationalRegisterNumber(loggedInUser.nationalRegisterNumber);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setNationalRegisterNumber(null);
  };

  return (
    <header className={styles.header}>
      <a>{t("title")}</a>
      <nav>
        {nationalRegisterNumber ? (
          <>
            <Link href={`/accounts/${nationalRegisterNumber}`}>{t("nav.accounts")}</Link>
            <Link href={`/users/settings/${nationalRegisterNumber}`}>Settings</Link>
            <a href="/" onClick={handleLogout}>{t("nav.logout")}</a>
            <Language />
          </>
        ) : (
          <>
            <Link href="/">{t("nav.home")}</Link>
            <Link href="/users/register">{t("nav.register")}</Link>
            <Link href="/users/login">{t("nav.login")}</Link>
            <Language />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
