import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HomeComponent: React.FC = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <section className="home-section">
      <h1 className="home-title">{t("home.title")}</h1>
      <p className="home-description">{t("home.description1")}</p>
      <p className="home-description">{t("home.description2")}</p>
    </section>
  );
};

export default HomeComponent;