import React from 'react';
import RegistrationForm from '../../components/register/Registration';
import Head from 'next/head';
import Header from '../../components/Header';

const Registration: React.FC = () => {
    return (
        <>
        <Head>
            <title>Spilled Popcorn</title>
            <meta name="description" content="Review app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/images/logo.png" />
        </Head>
        <div className="max-h-screen max-w-screen overflow-hidden flex flex-col-reverse md:flex-row">
            <Header></Header>
            <main className="p-1 flex-grow flex justify-center items-center">
            <section className="space-y-1 max-w-xs">
                <RegistrationForm />
            </section>
            </main>
        </div>
        </>
    );
};

export default Registration;
