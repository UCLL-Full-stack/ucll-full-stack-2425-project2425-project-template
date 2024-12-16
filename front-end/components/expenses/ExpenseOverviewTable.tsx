import React from 'react';
import styles from '../../styles/Home.module.css';
import { Expense } from '@types';

type Props = {
    expenses: Array<Expense>;
};

const ExpenseOverviewTable: React.FC<Props> = ({ expenses }: Props) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.month}>
                            <td>{expense.month}</td>
                            <td>{expense.totalCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseOverviewTable;
