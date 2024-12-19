import Head from "next/head";
import Header from "@/components/header";
import LoginForm from "@/components/login/LoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("login.title")}</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 flex flex-col items-center">
          <LoginForm />
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

export default Login;
