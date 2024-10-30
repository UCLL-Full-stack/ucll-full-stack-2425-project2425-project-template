import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Bestelling } from '@/types';
import Header from '@/components/header';
import BestellingService from '@/services/BestellingService';
import BestellingInfo from '@/components/bestellingen/BestellingInfo';

const BestellingId = () => {
    const [bestelling, setBestelling] = useState<Bestelling | null>(null);
    const router = useRouter();
    const { bestellingId } = router.query;

    const getBestellingById = async () => {
        const response = await BestellingService.getBestellingentById(bestellingId as string);
        const result = await response.json();
        setBestelling(result);
    }

    useEffect(() => {
        if (bestellingId) {
            getBestellingById();
        }
    }, [bestellingId]);

    return (
        <>
            <Head>
                <title>Pokebowl info </title>
            </Head>
            <Header />
            <main>
                <h1>Bestelling nummber: #{bestelling && bestelling.id}</h1>
                <section>
                    {!bestellingId && <p>Loading pokebowl info...</p>}
                    {bestellingId && <BestellingInfo bestelling={bestelling} />}
                </section>
            </main>
        </>
    );
};

export default BestellingId;