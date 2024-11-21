import Header from "@/components/header";
import LoginForm from "@/components/users/LoginForm";
import Head from "next/head";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
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