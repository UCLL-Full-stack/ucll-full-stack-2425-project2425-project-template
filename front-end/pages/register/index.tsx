import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kanben Esoteric Edition</title>
        <meta name="description" content="Kanben Esoteric Edition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
          <h1>Welcome!</h1>
      </main>
    </>
  );
};

export default Home;
