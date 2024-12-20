import Head from 'next/head';
import Header from '@components/header';
import CocktailForm from '@components/cocktail/cocktailForm';
import CocktailService from '@services/CocktailService';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UserAuthorisation from '@components/users/UserAuthorisation';

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
        <UserAuthorisation>
        <div>
        <CocktailForm
        submitButtonText="Add Cocktail"
        onSubmit={async function (cocktail: { name: string; description: string; strongness: number; image: string; }) {
            try {
            await CocktailService.addCocktail(cocktail);

            window.location.href = '/';
            
            } catch (error) {
            console.error("Failed to create cocktail:", error);
            }
        }}
        ></CocktailForm>
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
