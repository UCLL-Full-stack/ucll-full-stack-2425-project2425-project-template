import Head from 'next/head';
import ActiviteitenOverviewTable from '@/components/activiteiten/ActiviteitenOverviewTable';
import React, { useEffect, useState } from 'react';
import { Activiteit } from '@/types';
import ActiviteitService from '@/services/ActiviteitenService';
import { useRouter } from 'next/router';

const Activiteiten: React.FC = () => {
    const [activiteiten, setActiviteiten] = useState<Array<Activiteit>>();

    const router = useRouter();
    const { groepNaam } = router.query;

    const getActiviteitenByGroupName = async () => {
        const [activiteitenResponse] = await Promise.all([ActiviteitService.getActiviteitenByGroupName(groepNaam as string)]);
        const [activiteiten] = await Promise.all([activiteitenResponse.json()]);

        activiteiten.sort((a: Activiteit, b: Activiteit) => {
            return new Date(a.begindatum).getTime() - new Date(b.begindatum).getTime();
        });

        setActiviteiten(activiteiten);
    };

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
            <main>
                <h1 className="text-5xl font-extrabold text-center text-green-900 mt-4 mb-8">Activiteiten {groepNaam}</h1>
                <section className="relative">
                    {activiteiten && (
                        <ActiviteitenOverviewTable activiteiten={activiteiten} />
                    )}
                </section>
            </main>
        </>
    );
};

export default Activiteiten;
