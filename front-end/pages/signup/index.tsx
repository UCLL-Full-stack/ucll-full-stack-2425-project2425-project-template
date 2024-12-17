import Head from "next/head";
import Header from "@components/header";
import UserSignupForm from "@components/users/UserSignupForm";
import styles from '@styles/home.module.css';

const Signup: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main className={styles.myEventsMain}>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserSignupForm />
                </section>
            </main>
        </>
    );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Signup;
