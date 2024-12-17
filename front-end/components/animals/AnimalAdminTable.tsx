import React from 'react';
import styles from '../../styles/Home.module.css';
import { Animal } from '@types';
import AnimalService from '@services/AnimalService';
import { mutate } from 'swr';

type Props = {
    animal: Animal;
};

const AnimalOverviewTable: React.FC<Props> = ({ animal }: Props) => {
    const updateCaretaker = async () => {
        const newCaretaker = window.prompt(
            'Enter the ID or name of the new caretaker:',
            animal.caretaker.name
        );

        if (newCaretaker && newCaretaker !== animal.caretaker.name) {
            try {
                await AnimalService.putNewCaretaker(animal.id, newCaretaker);
                mutate('animals'); 
                console.log('Caretaker updated successfully');
            } catch (error) {
                console.error('Failed to update caretaker:', error);
            }
        } else {
            console.log('Caretaker update canceled or no change made.');
        }
    };

    const deleteAnimal = async () => {
        try {
            await AnimalService.deleteAnimal(animal.id);
            mutate('animals');
            console.log('Animal deleted successfully');
        } catch (error) {
            console.error('Failed to delete animal:', error);
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{animal.id}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{animal.name}</td>
                    </tr>
                    <tr>
                        <td>Age:</td>
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
                        <td>Caretaker:</td>
                        <td>
                            {animal.caretaker.name}
                            <button
                                onClick={updateCaretaker}
                                className="ml-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-1"
                            >
                                Update
                            </button>
                        </td>
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
                                        <tr key={expense.month}>
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
                                <button
                                    onClick={deleteAnimal}
                                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-10 py-2.5"
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AnimalOverviewTable;
