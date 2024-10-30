import React from 'react';
import Header from '@/components/header';
import Head from 'next/head';

const Lists: React.FC = () => {
    return (
        <>
            <Head>
                <title>Grocery lists</title>
            </Head>
            <header>
                <nav>
                    <Header />
                </nav>
            </header>
            <h1>Lists Page</h1>
            <p>This is the lists page.</p>
        </>
    )
};

export default Lists;