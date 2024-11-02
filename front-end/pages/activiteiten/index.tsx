import Head from 'next/head';
import ActiviteitenOverviewTable from '@/components/activiteiten/ActiviteitenOverviewTable';
import { useEffect, useState } from 'react';
import { Activiteit } from '@/types';
import ActiviteitService from '@/services/ActiviteitenService';

const Activiteiten: React.FC = () => {
    const [activiteiten, setActiviteiten] = useState<Array<Activiteit>>();

    const getActiviteiten = async () => {
        const response = await ActiviteitService.getAllActiviteiten();
        const activiteiten = await response.json();
        setActiviteiten(activiteiten);
    }

    useEffect(() => {
        getActiviteiten()
    }, []);

    return (
        <>
            <Head>
                <title>Activiteiten</title>
            </Head>
            <main>
                <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8">Alle Activiteiten</h1>
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