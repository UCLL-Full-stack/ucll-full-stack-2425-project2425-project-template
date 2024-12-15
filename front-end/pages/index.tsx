import Head from 'next/head';
import Header from '@/components/header';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>BowlBuddies</title>
        <meta name="description" content="BowlBuddies Pokebowl app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/logo.png" />
      </Head>
      <Header />
      <main>
        <h1>BowlBuddies Pokebowls</h1>
      </main>
    </>
  );
};

export default Home;
