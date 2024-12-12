import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serversideTranslations";

const Home: React.FC = () => {

  const {t} = useTranslation();

  return (
    <>
    <Head>
      <title>{t("app.title")}</title>
    </Head>
      <Header />
      <main className={styles.main}>
        <p>{t("main.introductionText")}</p>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const {locale} = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"]))
      },
  };
};

export default Home;
