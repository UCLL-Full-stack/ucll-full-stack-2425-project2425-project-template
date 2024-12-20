import Head from 'next/head';
import Header from '@components/header';
import UserLogin from '@components/userLogin/UserLogin';
import Signup from '@components/signup/Signup';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Signup</title>
                <meta name="description" content="Login page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Signup />
        </>
    );
};

export default Login;
