import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; permission: string } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Retrieve logged-in user's info
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const users = [
    { username: 'admin', password: 'Password1', role: 'ADMIN' },
    { username: 'user1', password: 'password', role: 'USER' },
  ];

  return (
    <>
      <Head>
        <title>{t('general.title')}</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>{t('home.welcome')}</h1>
        </span>

        <div className={styles.description}>
          <p>
            {t('home.description')} <br></br>
          </p>
        </div>

        {loggedInUser && (
          <div className="alert alert-success">
            {t('home.loggedInMessage', { username: loggedInUser.username, permission: loggedInUser.permission })}
          </div>
        )}

        <h2>{t('home.usersToLogin')}</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t('home.username')}</th>
              <th scope="col">{t('home.password')}</th>
              <th scope="col">{t('home.role')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Home;
