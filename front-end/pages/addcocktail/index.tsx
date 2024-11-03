import Head from 'next/head';
import Header from '@components/header';
import CocktailForm from '@components/cocktail/cocktailForm';
import CocktailService from '@services/CocktailService';

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

        <CocktailForm onSubmit={function (cocktail: { id: number; name: string; description: string; strongness: number; imageUrl: string; }): void {
                  CocktailService.addCocktail(cocktail)
              } }></CocktailForm>
      </main>
    </>
  );
};

export default Home;
