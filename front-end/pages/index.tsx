import CocktailList from '@components/cocktail/CocktailList';
import Head from 'next/head';
import Header from '@components/header';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>SipHappensOnline</title>
        <meta name="description" content="SipHappensOnline" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/placeholder.png" />
      </Head>
      <main>
        <Header></Header>
        <CocktailList></CocktailList>
      </main>
    </>
  );
};

export default Home;
