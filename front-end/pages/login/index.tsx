import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import styles from '@styles/home.module.css';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Login</title>
            </Head>
            <Header />
            <main className={styles.myEventsMain}>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;
