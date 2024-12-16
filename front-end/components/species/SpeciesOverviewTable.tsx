import React, { useEffect, useState } from 'react';
import SpeciesService from '../../services/SpeciesService';
import styles from '../../styles/Home.module.css';

type Species = {
    id: number;
    species: string;
};

type Props = {
    species: Array<Species>;
};

const SpeciesOverviewTable: React.FC<Props> = ({ species }: Props) => {
    const [animalCounts, setAnimalCounts] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const fetchAnimalCounts = async () => {
            const counts: { [key: number]: number } = {};
            for (const s of species) {
                const animals = await SpeciesService.getAnimalsBySpecies(s.id);
                counts[s.id] = animals.length;
            }
            setAnimalCounts(counts);
        };

        fetchAnimalCounts();
    }, [species]);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Species</th>
                        <th scope="col">Amount of animals from this species</th>
                    </tr>
                </thead>
                <tbody>
                    {species.map((s) => (
                        <tr key={s.id}>
                            <td>{s.species}</td>
                            <td>{animalCounts[s.id] || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpeciesOverviewTable;
