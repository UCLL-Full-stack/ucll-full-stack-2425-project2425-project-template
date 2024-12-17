import React from 'react';
import styles from '../../styles/Home.module.css';
import { Animal } from '@types';
import AnimalService from '@services/AnimalService';
import { mutate } from 'swr';

type Props = {
    animal: Animal;
};

const AnimalOverviewTable: React.FC<Props> = ({ animal }: Props) => {
    const deleteAnimal = async () => {
        try {
            await AnimalService.deleteAnimal(animal.id);
            mutate('animals');
            console.log('Animal deleted successfully');
        } catch (error) {
            console.error('Failed to delete animal:', error);
        }
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <tr>
                    <td>ID:</td>
                    <td>{animal.id}</td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{animal.name}</td>
                </tr>
                <tr>
                    <td>age:</td>
                    <td>{animal.age}</td>
                </tr>
                <tr>
                    <td>Species:</td>
                    <td>{animal.species.species}</td>
                </tr>
                <tr>
                    <td>Favourite food:</td>
                    <td>{animal.favouriteFood}</td>
                </tr>
                <tr>
                    <td>Favourite Toy:</td>
                    <td>{animal.favouriteToy}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Expenses:</th>
                                    <th>Month:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animal.expenses.map((expense) => (
                                    <tr>
                                        <td>{expense.totalCost} €</td>
                                        <td>{expense.month}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="text-center">
                        <div className="flex justify-center">
                            <button onClick={deleteAnimal} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-10 py-2.5">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default AnimalOverviewTable;
