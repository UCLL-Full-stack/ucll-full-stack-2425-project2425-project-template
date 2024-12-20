import { useRouter } from "next/router";
import React from "react";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    const { pathname, query, asPath } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="navbarbutton-stylah-lang">
      <label htmlFor="language" className="hidden">
        Language
      </label>
      <select
        id="language"
        className="navbar-dropdown"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="it">Italiano</option>
      </select>
    </div>
  );
};

export default Language;