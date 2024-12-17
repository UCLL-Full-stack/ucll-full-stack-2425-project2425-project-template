import SpeciesService from '@services/SpeciesService';
import { useEffect, useState } from 'react';
// import { Species } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import SpeciesOverviewTable from '@components/species/SpeciesOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Species: React.FC = () => {
    const getSpecies = async () => {
        const response = await SpeciesService.getSpecies();
        return await response.json();
    };

    const { data, isLoading, error } = useSWR('species', getSpecies);

    useInterval(
        () => {
            mutate('species', getSpecies());
        },
        isLoading ? 1000 : null
    );

    return (
        <>
            <Head>
                <title>Species</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Species</h1>
                <section>
                    <h2>Species overview</h2>
                    {error && <div className="text-center text-red-800">{error}</div>}
                    {isLoading && <p className="text-center text-green-800">Loading...</p>}
                    {data && <SpeciesOverviewTable species={data} />}
                </section>
            </main>
        </>
    );
};

export default Species;
