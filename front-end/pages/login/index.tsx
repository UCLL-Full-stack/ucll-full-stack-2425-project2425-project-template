import LoginForm from "@/components/login/LoginForm";
import React from 'react';
import Head from 'next/head';
import Header from '@/components/header';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl font-extrabold text-green-900">Login</h1>
                <div className="m-5">
                    <LoginForm />
                </div>
            </main>
        </>
    );
};

export default Login;