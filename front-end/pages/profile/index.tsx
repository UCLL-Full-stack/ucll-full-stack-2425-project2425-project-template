import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';

const Profile: React.FC = () => {
    return (
        <>
        <Head>
          <title>Spilled Popcorn</title>
          <meta name="description" content="Review app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/logo.png" />
        </Head>
        <div className="min-h-screen max-w-screen flex flex-col-reverse md:flex-row">
          <Header></Header>
          <main className="p-1 flex-grow flex justify-center items-center">
            <section className="space-y-8 max-w-xs">
              <h1 className="text-primary-one font-bold text-center text-3xl">Empty Profile Page</h1>
              <p className='p-1 flex-grow flex justify-center items-center'>Welcome to your profile!</p>
            </section>
          </main>
        </div>
      </>

    );
};

export default Profile;
