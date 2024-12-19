import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import NieuwsOverviewTable from '@/components/nieuws/NieuwsOverviewTable';
import NieuwsOverviewTableAdmin from '@/components/nieuws/NieuwsOverviewTableAdmin';
import { Nieuwsbericht } from '@/types';
import getAllNieuwsberichten from '@/services/NieuwsberichtService';

const Nieuws: React.FC = () => {
    const [nieuwsberichten, setNieuwsberichten] = useState<Nieuwsbericht[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchNieuwsberichten = async () => {
            const getNieuwsberichten = await getAllNieuwsberichten();
            const nieuwsberichten = await getNieuwsberichten.json();
            setNieuwsberichten(nieuwsberichten);
        };
        fetchNieuwsberichten();

        if (typeof window !== 'undefined') {
            const user = sessionStorage.getItem("loggedInUser");
            const role = sessionStorage.getItem("role");
            setUserRole(role);
            setLoggedInUser(user);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Nieuws</title>
            </Head>
            <Header />
            <main className="min-h-screen">
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Nieuws Overzicht</h1>
                <div className="m-5">
                    {userRole === 'Hoofdleiding' ? (
                        <NieuwsOverviewTableAdmin nieuwsberichten={nieuwsberichten} />
                    ) : (
                        <NieuwsOverviewTable nieuwsberichten={nieuwsberichten} />
                    )}
                </div>
            </main>
        </>
    );
}

export default Nieuws;