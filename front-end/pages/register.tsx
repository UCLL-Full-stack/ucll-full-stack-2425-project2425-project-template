import Head from "next/head";
import Header from "../components/Navbar";
import UserRegisterForm from "../components/UserRegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";

const Register: React.FC = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <Head>
                <title>{t("register.titel")}</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        },
    };
};

export default Register;
