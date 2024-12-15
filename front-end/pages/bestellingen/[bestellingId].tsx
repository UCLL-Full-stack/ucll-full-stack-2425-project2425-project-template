import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Bestelling } from '@/types';
import Header from '@/components/header';
import BestellingService from '@/services/BestellingService';
import BestellingInfo from '@/components/bestellingen/BestellingInfo';
import useSWR from 'swr';

const BestellingId = () => {
    const router = useRouter();
    const { bestellingId } = router.query;

    const getBestellingById = async () => {
        const responses = await Promise.all([BestellingService.getBestellingentById(bestellingId as string)]);
        const [bestellingResponses] = responses;

        if (bestellingResponses.ok) {
            const bestelling = await bestellingResponses.json();
            return { bestelling }
        }
    }

    const { data, isLoading, error } = useSWR(
        "bestellingen",
        getBestellingById
    );

    return (
        <>
            <Head>
                <title>Pokebowl info </title>
            </Head>
            <Header />
            <main>
                <h1>Bestelling</h1>
                <section>
                    {error && <p className="error-field">{error}</p>}
                    {!isLoading && <p>Loading bestelling info...</p>}
                    {bestellingId && <BestellingInfo bestelling={data?.bestelling} />}
                </section>
            </main>
        </>
    );
};

export default BestellingId;