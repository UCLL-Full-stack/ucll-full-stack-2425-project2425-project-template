import Head from "next/head";
import Header from "@/components/header";
import LoginForm from "@/components/login/LoginForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <LoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;
