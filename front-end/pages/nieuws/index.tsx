import Head from 'next/head';
import React from 'react';
import Header from '@/components/header';
import NieuwsOverviewTable from '@/components/nieuws/NieuwsOverviewTable';

const Nieuws: React.FC = () => {
    const nieuwsberichten = [
        { titel: "Inschrijvingen scoutsjaar 2024-2025", groep: "Iedereen", auteur: "NA" },
        { titel: "GDPR wetgeving", groep: "Iedereen", auteur: "NA" }
    ];

    return (
        <>
            <Head>
                <title>Nieuws</title>
            </Head>
            <Header />
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Nieuws Overzicht</h1>
                <div className="m-5">
                    <NieuwsOverviewTable nieuwsberichten={nieuwsberichten} />
                </div>
                <div className="m-5 flex space-x-4 pl-4">
                    <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-800">Nieuw</button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-800">Edit</button>
                </div>
            </main>
        </>
    );
};

export default Nieuws;