import Header from "@components/header"
import Head from "next/head"
import { useTranslation } from "react-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import SignUpOverview from "@components/signup/SignUpOverview";

const SignUp: React.FC = () => {

    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t("signup.title")}</title>
            </Head>
            <Header />
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <section className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <SignUpOverview />
                </section>
            </main>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };

export default SignUp;