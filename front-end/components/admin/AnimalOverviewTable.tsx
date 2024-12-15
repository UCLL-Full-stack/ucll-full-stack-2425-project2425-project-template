import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { Animal } from '@types';

type Props = {
    animals: Array<Animal>;
    selectAnimal: (animal: Animal) => void;
};

const AnimalOverviewTable: React.FC<Props> = ({ animals, selectAnimal }: Props) => {
    const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

    const groupedAnimals = animals.reduce((acc, animal) => {
        if (!acc[animal.species]) {
            acc[animal.species] = { animals: [], totalCost: 0 };
        }
        acc[animal.species].animals.push(animal);
        acc[animal.species].totalCost += animal.costPerMonthPerSpecies;
        return acc;
    }, {} as Record<string, { animals: Animal[]; totalCost: number }>);

    return (
        <>
            {selectedSpecies ? (
                <>
                    <button onClick={() => setSelectedSpecies(null)}>Back</button>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedAnimals[selectedSpecies].animals.map((animal) => (
                                <tr
                                    key={animal.id}
                                    onClick={() => selectAnimal(animal)}
                                    role="button"
                                >
                                    <td>{animal.name}</td>
                                    <td>{animal.costPerMonth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th scope="col">Species</th>
                            <th scope="col">Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedAnimals).map(([species, { totalCost }]) => (
                            <tr
                                key={species}
                                onClick={() => setSelectedSpecies(species)}
                                role="button"
                            >
                                <td>{species}</td>
                                <td>{totalCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default AnimalOverviewTable;
