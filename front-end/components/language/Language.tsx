import { useRouter } from "next/router";
import styles from '../../styles/Navbar.module.css';

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale }); 
  };

  return (
    <div className="ml-6">
      <label htmlFor="language" className="text-white">
        Language
      </label>
      <select
        id="language"
        className={styles["navbar-language-default"]}
        value={locale}
        onChange={handleLanguageChange}
      >
        <option className={styles['navbar-language-update']} value="en">English</option>
        <option className={styles['navbar-language-update']} value="nl">Nederlands</option>
      </select>
    </div>
  );
};

export default Language;
