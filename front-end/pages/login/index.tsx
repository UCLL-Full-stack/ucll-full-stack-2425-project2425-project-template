import Head from 'next/head';
import Header from '@components/header';
import UserLoginForm from '@components/users/UserLoginForm';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import router from 'next/router';

const Login: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Header />
            <main>
                <section className="container">
                    <UserLoginForm />
                </section>
                <div className="text-center mt-3">
                    <button className="btn btn-secondary" onClick={() => router.push('/register')}>
                        Register
                    </button>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Login;