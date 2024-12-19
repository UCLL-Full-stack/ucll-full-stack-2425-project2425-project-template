import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Favorites: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('header.favorites')}</title>
      </Head>
      <Header />
      <main>
        <section className="home-section">
          <h1 className="home-title">{t('header.favorites')}</h1>
          <p className="home-description">Your favorite cocktails will be displayed here.</p>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Favorites;