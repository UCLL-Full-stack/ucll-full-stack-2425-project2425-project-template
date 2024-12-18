import Head from 'next/head';
import Header from '@/components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '@/styles/Home.module.css';

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
      <main className='homepage-main'>
        <section className='homepage-section'>
          <h1 className={styles.title}>{t("page.title")}</h1>
          <p className={styles.description}>{t("page.description")}</p>
        </section>
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
