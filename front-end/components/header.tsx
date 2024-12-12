import Link from 'next/link';
import Language from './language';
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {

  const {t} = useTranslation();

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        {t("app.title")}
      </a>
      <nav className="nav justify-content-center">
      <Link href="/login" className="nav-link px-4 fs-5 text-white">
          {t("header.login")}
        </Link>
        <Link href="/pokemons" className="nav-link px-4 fs-5 text-white">
          {t("header.pokemon")}
        </Link>
        <Link href="/calendar" className="nav-link px-4 fs-5 text-white">
          {t("header.calender")}
        </Link>
        <Link href="/badges" className="nav-link px-4 fs-5 text-white">
          {t("header.badges")}
        </Link>
        <Language></Language>
      </nav>
    </header>
  );
};

export default Header;
