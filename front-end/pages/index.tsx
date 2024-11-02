import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>RaceForms</title>
        <meta name="description" content="RaceForms.net" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/courses.png"
            alt="Website Logo"
            className={styles.vercelLogo}
            width={50}
            height={50}
          />
          <h1>Welcome to hell!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>
            Labore cupiditate iste sunt atque distinctio mollitia assumenda
            numquam corrupti laboriosam magni nobis at impedit et quibusdam,
            sapiente autem. <br></br>
            Laudantium, asperiores debitis.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
