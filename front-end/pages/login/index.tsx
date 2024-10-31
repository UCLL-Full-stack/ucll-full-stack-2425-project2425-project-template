import Header from "@components/header";
import Head from "next/head";
import LoginPage from "@components/login/LoginPage";

const Login: React.FC = () => {
    return (
        <>
        <Head>
            <title>Login</title>
        </Head>
        <main>
            <Header/>
            <LoginPage/>
        </main>
        </>
    );
}

export default Login;