import CocktailList from '@components/CocktailList';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <span>
          
          <h1>Welcome!</h1>
        </span>

        <div>
          <p>
            Lets make some cocktails!
          </p>
        </div>
        <div>
            <CocktailList></CocktailList>   
        </div>
      </main>
    </>
  );
};

export default Home;
