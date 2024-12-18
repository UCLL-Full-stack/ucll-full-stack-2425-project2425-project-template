import Head from 'next/head';
import React from 'react';
import Header from '@/components/header';
import LeidingOverviewTable from '@/components/leiding/LeidingOverviewTable';

const Leiding: React.FC = () => {
    const leiding = [
        { naam: "Jan Janssen", totem: "Leeuw", telefoon: "0123456789", groep: { naam: "Groep A" } },
        { naam: "Piet Pieters", totem: "Tijger", telefoon: "0987654321", groep: { naam: "Groep B" } },
        { naam: "Klaas Klaassen", totem: "Olifant", telefoon: "1234567890", groep: { naam: "Groep C" } },
        { naam: "Marie Maries", totem: "Panter", telefoon: "9876543210", groep: { naam: "Groep D" } }
    ];

    return (
        <>
            <Head>
                <title>Leiding</title>
            </Head>
            <Header />
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Leiding Overzicht</h1>
                <div className="m-5">
                    <LeidingOverviewTable leiding={leiding} />
                </div>
            </main>
        </>
    );
};

export default Leiding;