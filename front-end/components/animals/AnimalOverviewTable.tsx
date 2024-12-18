import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { Animal } from '@types';

type Props = {
    animals: Array<Animal>;
    selectAnimal: (animal: Animal) => void;
    DetailTableComponent: React.FC<{ animal: Animal }>;
};

const AnimalOverviewTable: React.FC<Props> = ({ animals, selectAnimal, DetailTableComponent }: Props) => {
    const [expandedAnimal, setExpandedAnimal] = useState<Animal | null>(null);

    const toggleExpand = (animal: Animal) => {
        if (expandedAnimal && expandedAnimal.id === animal.id) {
            setExpandedAnimal(null);
        } else {
            setExpandedAnimal(animal);
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Species</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <React.Fragment key={animal.id}>
                            <tr onClick={() => toggleExpand(animal)} role="button">
                                <td>{animal.name}</td>
                                <td>{animal.species.species}</td>
                                <td>{animal.age}</td>
                            </tr>
                            {expandedAnimal && expandedAnimal.id === animal.id && (
                                <tr>
                                    <td colSpan={3}>
                                        <DetailTableComponent animal={animal} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnimalOverviewTable;