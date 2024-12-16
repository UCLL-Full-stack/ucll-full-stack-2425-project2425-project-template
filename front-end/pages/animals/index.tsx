import AnimalService from '@services/AnimalService';
import { useEffect, useState } from 'react';
import { Animal, User } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import AnimalOverviewTable from '@components/animals/AnimalOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Animals: React.FC = () => {
    // const [animals, setAnimals] = useState<Animal[]>();
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const getAnimals = async () => {
        if (loggedInUser && loggedInUser.role === 'caretaker') {
            const response = await AnimalService.getAnimalsByCaretaker(loggedInUser.username);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('You are not authorized to view this page.');
                } else {
                    throw new Error(response.statusText);
                }
            }
            return await response.json();
        } else {
            const response = await AnimalService.getAnimals();

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('You are not authorized to view this page.');
                } else {
                    throw new Error(response.statusText);
                }
            }

            return await response.json();
        }
    };

    const { data, isLoading, error } = useSWR(loggedInUser ? 'animals' : null, getAnimals);

    useInterval(
        () => {
            mutate('animals', getAnimals());
        },
        isLoading ? 1000 : null
    );

    const selectAnimal = (animal: Animal) => {
        setSelectedAnimal(animal);
    };

    return (
        <>
            <Head>
                <title>Animals</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Animals</h1>
                <section>
                    <h2>Animals overview</h2>
                    {error && <div className="text-center text-red-800">{error.message}</div>}
                    {isLoading && <p className="text-center text-green-800">Loading...</p>}
                    {data && <AnimalOverviewTable animals={data} selectAnimal={selectAnimal} />}
                </section>
                {/* {selectedAnimal && (
                    <section>
                        <h2>Courses taught by {selectedAnimal.user.firstName}</h2>
                        <CourseOverviewTable animal={selectedAnimal} />
                    </section>
                )} */}
            </main>
        </>
    );
};

export default Animals;
