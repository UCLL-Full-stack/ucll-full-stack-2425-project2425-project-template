import React from 'react';
import styles from '../../styles/Home.module.css';
import { Animal } from '@types';

type Props = {
    animals: Array<Animal>;
    selectAnimal: (animal: Animal) => void;
};

const AnimalOverviewTable: React.FC<Props> = ({ animals, selectAnimal }: Props) => {
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
                        <tr key={animal.name} onClick={() => selectAnimal(animal)} role="button">
                            <td>{animal.name}</td>
                            <td>{animal.species.species}</td>
                            <td>{animal.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnimalOverviewTable;
