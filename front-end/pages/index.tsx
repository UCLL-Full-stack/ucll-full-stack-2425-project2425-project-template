import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import header from '@/components/header';
import Header from '@/components/header';

const Home: React.FC = () => {
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
                    <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Welkom op de agenda van Scouts Overijse!</h1>
                </span>
                <div className="m-5">
                    <h3>Nieuws</h3>
                    <h4>Inschrijvingen scoutsjaar 2024-2025</h4>
                    <p>Beste ouders en leden,
                        na weer twee lange maanden zonder scouts zijn we eindelijk weer terug! Zondag 29 september start het nieuwe fantastische scoutsjaar, van 14u tot 17u is elke jongen van 6 tot 17 jaar van harte welkom. Hieronder vindt u de inschrijvingslink voor het scoutsjaar 2024-2025
                    </p>
                    <a className="underline text-blue-700 hover:text-gray-500" href="https://forms.office.com/Pages/ResponsePage.aspx?id=G4Y45tkV5k2mXbSHia4fCIrv-xVnqwhGiPRhhKckvedUN1ROQ1kyWTdGQ1ZGN1ZHQzI3MTNLUU5QRC4u">Forum</a>
                    <p>Stevige Linker</p>
                    <p>De groepsleiding</p>
                </div>
                <div className="m-5">
                    <h4>GDPR wetgeving</h4>
                    <p>Beste ouders, Via deze link kan u naar onze GDPR wetgeving pagina gaan.</p>
                    <a className="underline text-blue-700 hover:text-gray-500" href="https://docs.google.com/document/d/1pe6MTjk5iv7z-8TXW39-I7fcgSCO77TT7c1QmWDROIc/edit?usp=sharing">GDPR link</a>
                    <p>Met scoutieve groeten,</p>
                    <p>De leiding</p>
                </div>
            </main>
        </>
    );
};

export default Home;
