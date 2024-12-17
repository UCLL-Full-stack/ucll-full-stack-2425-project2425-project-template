import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { Expense } from '@types';

type Props = {
    expenses: Array<Expense>;
};

const ExpenseOverviewTable: React.FC<Props> = ({ expenses }: Props) => {
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    const sortedExpenses = [...expenses].sort((a, b) => {
        return sortOrder === 'asc' ? a.totalCost - b.totalCost : b.totalCost - a.totalCost;
    });

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col" style={{ width: '50%' }}>Month</th>
                        <th scope="col" style={{ width: '50%' }}>
                            Total Cost{' '}
                            <select value={sortOrder} onChange={handleSortOrderChange} className="ml-36">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map((expense) => (
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
