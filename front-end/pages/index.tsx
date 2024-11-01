import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
      <>
        <Head>
          <title>Agenda</title>
          <meta name="description" content="Courses app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
        <span>
          <h1>Welkom op de agenda van Scouts Overijse!</h1>
        </span>

          <div>
              <p>
                  Klik om de huidige activiteiten te zien
              </p>
              <Link href="/activiteiten" className="nav-link px-4 fs-5 text-white">
                  Activiteiten
              </Link>
          </div>
        </main>
      </>
  );
};

export default Home;
