import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import styles from '../../styles/Home.module.css';
import { Animal, Caretaker, StatusMessage } from '@types';
import AnimalService from '@services/AnimalService';
import UserService from '@services/UserService';
import { mutate } from 'swr';
import classNames from 'classnames';

type Props = {
    animal: Animal;
};

const AnimalOverviewTable: React.FC<Props> = ({ animal }: Props) => {
    const [caretakers, setCaretakers] = useState<Caretaker[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const fetchCaretakers = async () => {
        try {
            const response = await UserService.getCaretakers();
            if (!response.ok) {
                throw new Error(`Failed to fetch caretakers: ${response.statusText}`);
            }
            const caretakerList = await response.json();
            console.log('Fetched caretakers:', caretakerList);
            setCaretakers(caretakerList);
        } catch (error) {
            console.error('Failed to fetch caretakers:', error);
        }
    };

    const handleUpdateCaretaker = async (caretakerId: number) => {
        try {
            if (caretakerId === animal.caretaker.id) {
                setStatusMessages([
                    { message: 'This caretaker already takes care of this animal.', type: 'error' },
                ]);
                setIsPopupOpen(false);
            } else {
                setStatusMessages([{ message: 'Updated animals caretaker!', type: 'success' }]);
                await AnimalService.putNewCaretaker(animal.id, caretakerId);
                mutate('animals');
                console.log('Caretaker updated successfully');
                setIsPopupOpen(false);
            }
        } catch (error) {
            console.error('Failed to update caretaker:', error);
        }
    };

    return (
        <>
            {statusMessages && (
                <div className="row">
                    <ul className="mx-auto mb-3 list-none text-center">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-blue-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
                                    onClick={() => {
                                        fetchCaretakers();
                                        setIsPopupOpen(true);
                                    }}
                                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-10 py-2.5 ml-28"
                                >
                                    Update
                                </button>
                                <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                                    <div className="p-4 bg-neutral-700 rounded shadow-md border">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Select a new caretaker
                                        </h3>
                                        <ul>
                                            {caretakers.map((caretaker) => (
                                                <li key={caretaker.id} className="mb-2">
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateCaretaker(caretaker.id)
                                                        }
                                                        className="text-green-500 hover:underline"
                                                    >
                                                        {caretaker.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => setIsPopupOpen(false)}
                                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Popup>
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
                                        onClick={async () => {
                                            try {
                                                await AnimalService.deleteAnimal(animal.id);
                                                mutate('animals');
                                                console.log('Animal deleted successfully');
                                            } catch (error) {
                                                console.error('Failed to delete animal:', error);
                                            }
                                        }}
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
        </>
    );
};

export default AnimalOverviewTable;
