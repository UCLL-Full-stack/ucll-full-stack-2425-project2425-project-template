import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pokebowl } from '@/types';
import PokebowlService from '@/services/PokebowlService';
import Header from '@/components/header';
import PokebowlInfo from '@/components/pokebowls/PokebowlInfo';

const PokebowlId = () => {
    const [pokebowl, setPokebowl] = useState<Pokebowl | null>(null);
    const router = useRouter();
    const { pokebowlId } = router.query;

    const getPokebowlById = async () => {
        const response = await PokebowlService.getPokebowlById(pokebowlId as string);
        const result = await response.json();
        setPokebowl(result);
    }

    useEffect(() => {
        if (pokebowlId) {
            getPokebowlById();
        }
    }, [pokebowlId]);

    return (
        <>
            <Head>
                <title>Pokebowl info </title>
            </Head>
            <Header />
            <main>
                <h1>Pokebowl: {pokebowl && pokebowl.naam}</h1>
                <section>
                    {!pokebowlId && <p>Loading pokebowl info...</p>}
                    {pokebowlId && <PokebowlInfo pokebowl={pokebowl} />}
                </section>
            </main>
        </>
    );
};

export default PokebowlId;