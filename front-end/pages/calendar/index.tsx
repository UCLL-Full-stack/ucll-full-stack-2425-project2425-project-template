import Header from '@components/header';
import styles from '@styles/home.module.css';
import { serverSideTranslations } from 'next-i18next/serversideTranslations';
import { useTranslation } from 'react-i18next';

const calendar: React.FC = () => {

  const {t} = useTranslation();
  return (
    <>
      <Header />
      <main className={styles.main}>
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

export default calendar;