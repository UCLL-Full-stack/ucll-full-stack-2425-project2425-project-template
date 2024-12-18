import React from 'react';
import styles from '../../styles/Home.module.css';
import { Animal } from '@types';

type Props = {
    animal: Animal;
};

const AnimalOverviewTable: React.FC<Props> = ({ animal }: Props) => {
    return (
        <div className={styles.tableContainer}>
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
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AnimalOverviewTable;
