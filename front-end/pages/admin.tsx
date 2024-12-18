import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import header from '@/components/header';
import Header from '@/components/header';

const AdminHome: React.FC = () => {
    return (
        <>
            <Head>
                <title>Agenda</title>
                <meta name="description" content="Agenda app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <span>
                    <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Welkom [admin]</h1>
                </span>
                <div className='ml-5 underline'>Uitloggen</div>
            </main>
        </>
    );
};

export default AdminHome;
