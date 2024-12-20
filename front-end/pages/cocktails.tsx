import CocktailList from '@components/cocktail/cocktailList';
import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UserAuthorisation from '@components/users/UserAuthorisation';

const Home: React.FC = () => {
  const {t} = useTranslation()
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
        <UserAuthorisation>
          <div>
          <CocktailList></CocktailList>
          </div>
        </UserAuthorisation>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
}; 

export default Home;
