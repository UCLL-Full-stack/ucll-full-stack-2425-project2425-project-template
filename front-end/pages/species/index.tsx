import SpeciesService from '@services/SpeciesService';
import { useEffect, useState } from 'react';
import { Species } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import SpeciesOverviewTable from '@components/species/SpeciesOverviewTable';

const Species: React.FC = () => {
    const [species, setSpecies] = useState<Species[]>();
    const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getSpecies = async () => {
        const response = await SpeciesService.getSpecies();
        const species = await response.json();
        setSpecies(species);
    };

    useEffect(() => {
        getSpecies();
    }, []);

    const selectSpecies = (species: Species) => {
        setSelectedSpecies(species);
    };

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

                    {species && (
                        <SpeciesOverviewTable species={species} selectSpecies={selectSpecies} />
                    )}
                </section>
                {/* {selectedSpecies && (
                    <section>
                        <h2>Courses taught by {selectedSpecies.user.firstName}</h2>
                        <CourseOverviewTable species={selectedSpecies} />
                    </section>
                )} */}
            </main>
        </>
    );
};

export default Species;
