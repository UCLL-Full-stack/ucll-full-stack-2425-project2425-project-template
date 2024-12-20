import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-2 py-1 rounded-full transition-colors ${
          locale === "en"
            ? "bg-blue-600 text-white font-bold"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        aria-label="Switch to English"
      >
        🇺🇸
      </button>
      <button
        onClick={() => handleLanguageChange("es")}
        className={`px-2 py-1 rounded-full transition-colors ${
          locale === "es"
            ? "bg-blue-600 text-white font-bold"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        aria-label="Switch to Spanish"
      >
        🇪🇸
      </button>
    </div>
  );
};

export default Language;
