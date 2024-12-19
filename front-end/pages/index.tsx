import CocktailList from '@components/cocktail/cocktailList';
import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Sip Happens Online</title>
        <meta name="description" content="Sip Happens Online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/placeholder.png" />
      </Head>
      <main>
        <Header />
        <section className="home-section">
          <h1 className="home-title">{t("home.title")}</h1>
          <p className="home-description">{t("home.description1")}</p>
          <p className="home-description">{t("home.description2")}</p>
        </section>
        <section className="home-section">
          <h2 className="home-subtitle">{t("home.userInformation.title")}</h2>
          <table className="user-info-table">
            <thead>
              <tr>
                <th>{t("home.userInformation.email")}</th>
                <th>{t("home.userInformation.password")}</th>
                <th>{t("home.userInformation.role")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin@email.com</td>
                <td>admin</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td>user1@email.com</td>
                <td>user1</td>
                <td>a normal user</td>
              </tr>
              <tr>
                <td>moderator1@email.com</td>
                <td>moderator1</td>
                <td>Moderator</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
