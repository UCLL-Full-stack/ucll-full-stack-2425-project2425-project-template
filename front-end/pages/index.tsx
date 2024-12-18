import CocktailList from '@components/cocktail/CocktailList';
import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";



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
        <section>
          <h1>{t("home.title")}</h1>
          <p>{t("home.description1")}</p>
          <p>{t("home.description2")}</p>
        </section>
        <section>
          <h2>{t("home.userInformation.title")}</h2>
          <table>
            <thead>
              <tr>
                <th>{t("home.userInformation.username")}</th>
                <th>{t("home.userInformation.password")}</th>
                <th>{t("home.userInformation.role")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin</td>
                <td>admin</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td>user1</td>
                <td>user1</td>
                <td>a normal user</td>
              </tr>
              <tr>
                <td>moderator1</td>
                <td>moderator1</td>
                <td>Moderator</td>
              </tr>
              {/* <tr>
                <td>user4</td>
                <td>user4</td>
                <td>rol in de context van je project (bv. admin)</td>
              </tr> */}
            </tbody>
          </table>
        </section>
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