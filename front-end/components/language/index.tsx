import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <label htmlFor="language" className="sr-only">
        Language
      </label>
      <select
        id="language"
        className="bg-card text-primary border-none p-2 rounded-full w-12 text-center"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">EN</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default Language;