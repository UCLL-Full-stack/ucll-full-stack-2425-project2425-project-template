import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/header';
import styles from '@/styles/Home.module.css';
import { User } from '@/types';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, []);
  return (
    <>
      <Head>
        <title>Basketball Belgium</title>
        <meta name="description" content="Basketball Belgium" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome, {loggedInUser}!</h1>
        </span>
      </main>
    </>
  );
};

export default Home;