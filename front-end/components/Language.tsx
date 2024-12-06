import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Language: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newlocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: newlocale });
  };

  return (
    <div className=" d-flex flex-row align-items-center">
      <label htmlFor="language" className="text-white fs-5 mx-3">
        {t("header.language")}
      </label>
      <select
        id="language"
        onChange={handleLanguageChange}
        className="form-select"
      >
        <option value="nl">{t("header.languageSelect.nl")}</option>
        <option value="en">{t("header.languageSelect.en")}</option>
      </select>
    </div>
  );
};
export default Language;
