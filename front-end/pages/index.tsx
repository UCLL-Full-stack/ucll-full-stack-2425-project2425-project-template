import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Header from '@/components/header';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Bio-Scope</title>
        <meta name="description" content="Bio-Scope Movie Theater" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome to Bio-Scope!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Bio-Scope is more than just a movie theater; it’s a destination for film lovers.
            From the latest blockbusters to timeless classics, we bring a rich selection of films 
            to the screen, offering a unique viewing experience for all ages. Relax in our comfortable 
            theaters, enjoy state-of-the-art sound and visuals, and let us take you on a cinematic journey. 
            Join us for an unforgettable night out at the movies!
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
