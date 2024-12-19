import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import ActiviteitenOverviewTable from '@/components/activiteiten/ActiviteitenOverviewTable';
import ActiviteitService from '@/services/ActiviteitenService';
import { Activiteit } from '@/types';

const Activiteiten: React.FC = () => {
    const [activiteiten, setActiviteiten] = useState<Array<Activiteit>>([]);

    const getActiviteiten = async () => {
        const response = await ActiviteitService.getAllActiviteiten();
        const activiteiten = await response.json();
        setActiviteiten(activiteiten);
    }

    useEffect(() => {
        getActiviteiten();
    }, []);

    return (
        <>
            <Head>
                <title>Activiteiten</title>
            </Head>
            <Header />
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Alle Activiteiten</h1>
                <section className="relative mt-8">
                    <ActiviteitenOverviewTable activiteiten={activiteiten} />
                </section>
            </main>
        </>
    );
};

export default Activiteiten;