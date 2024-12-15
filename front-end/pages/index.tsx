import Head from 'next/head';
import Header from '@/components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="BowlBuddies Pokebowl app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/logo.png" />
      </Head>
      <Header />
      <main>
        <h1>{t("page.title")}</h1>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};


export default Home;
