import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import UserRegisterForm from "@components/users/UserRegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UserInformation from "@components/users/UserInformation";

const Login: React.FC = () => {
  const { t } = useTranslation();

  const handleRegisterSubmit = (data: any) => {
    console.log('User registered:', data);
  };

  return (
    <>
      <Head>
        <title>{t('login.title')}</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          <div className="form-container">
            <div className="form-section">
              <UserLoginForm />
            </div>
            <div> 
              <UserInformation /> 
              </div>
            <div className="form-section">
              <UserRegisterForm onSubmit={handleRegisterSubmit}/>
            </div>
            
          </div>
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