import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
      <>
        <Head>
          <title>Agenda</title>
          <meta name="description" content="Agenda app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
          <main>
        <span>
          <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Welkom op de agenda van Scouts Overijse!</h1>
        </span>

              {/*<div>*/}
              {/*    <p>*/}
              {/*        Klik om de huidige activiteiten te zien*/}
              {/*    </p>*/}
              {/*    <Link href="/activiteiten" className="nav-link px-4 fs-5 text-black hover:text-blue-200">*/}
              {/*        Activiteiten*/}
              {/*    </Link>*/}
              {/*</div>*/}
              <div>
                  <p className="pl-4">
                      Klik om huidige activiteiten van groep 1 te zien
                  </p>
                  <Link href="/activiteiten/groep 1" className="nav-link p-6 underline hover:text-amber-800">
                      Activiteiten groep 1
                  </Link>
              </div>
              <div>
                  <p className="pl-4">
                      Klik om huidige activiteiten van groep 2 te zien
                  </p>
                  <Link href="/activiteiten/groep 2" className="nav-link p-6 underline hover:text-amber-800">
                      Activiteiten groep 2
                  </Link>
              </div>
          </main>
      </>
  );
};

export default Home;
