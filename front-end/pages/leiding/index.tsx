import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import LeidingOverviewTable from '@/components/leiding/LeidingOverviewTable';
import { Leiding } from '@/types';
import LeidingService from '@/services/LeidingService';

const Leiders: React.FC = () => {
    const [leiders, setLeiders] = useState<Array<Leiding>>([]);
    const [error, setError] = useState<string | null>(null);

    const getLeiders = async () => {
        setError("");
        try {
            const response = await LeidingService.getLeiding();
            setLeiders(response);
        } catch (error) {
            if (error.message === "Failed to get leiding.") {
                setError("You are not authorized to view this page. Please login first.");
            } else {
                setError(error.message);
            }
        }
    }

    useEffect(() => {
        getLeiders();
    }, []);

    return (
        <>
            <Head>
                <title>Leiding</title>
            </Head>
            <Header />
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Leiding Overzicht</h1>
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {leiders.length > 0 ? (
                        <LeidingOverviewTable leiding={leiders} />
                    ) : (
                        <p className="text-center text-gray-600">Geen leiding gevonden.</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Leiders;