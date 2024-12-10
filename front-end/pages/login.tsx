import Head from "next/head";
import Header from "../components/Navbar";
import UserLoginForm from "../components/UserLoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";

const Login: React.FC = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <Head>
                <title>{t("login.titel")}</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  { locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"]))
        },
    };
};

export default Login;
