import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import ActiviteitenOverviewTable from '@/components/activiteiten/ActiviteitenOverviewTable';
import ActiviteitService from '@/services/ActiviteitenService';
import { Activiteit } from '@/types';
import { useRouter } from 'next/router';

const Activiteiten: React.FC = () => {
    const [activiteiten, setActiviteiten] = useState<Array<Activiteit>>([]);
    const router = useRouter();
    const { groepNaam } = router.query;

    const getActiviteitenByGroupName = async () => {
        const response = await ActiviteitService.getActiviteitenByGroupName(groepNaam as string);
        const activiteiten = await response.json();
        setActiviteiten(activiteiten);
    }

    useEffect(() => {
        if (groepNaam) {
            getActiviteitenByGroupName();
        }
    }, [groepNaam]);

    return (
        <>
            <Head>
                <title>Activiteiten</title>
            </Head>
            <Header />
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Activiteiten {groepNaam}</h1>
                <section className="relative mt-8">
                    <ActiviteitenOverviewTable activiteiten={activiteiten} />
                </section>
            </main>
        </>
    );
};

export default Activiteiten;