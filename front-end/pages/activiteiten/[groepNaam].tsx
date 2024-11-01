import Head from 'next/head';
import ActiviteitenOverviewTable from '@/components/activiteiten/ActiviteitenOverviewTable';
import { useEffect, useState } from 'react';
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
        setActiviteiten(activiteiten);
    };

    useEffect(() => {
        if (groepNaam) {
            getActiviteitenByGroupName();
        }
    });

    return (
        <>
            <Head>
                <title>Activiteiten</title>
            </Head>
            <main>
                <h1>Activiteiten {groepNaam}</h1>
                <section>
                    {activiteiten && (
                        <ActiviteitenOverviewTable activiteiten={activiteiten} />
                    )}
                </section>
            </main>
        </>
    );
};

export default Activiteiten;