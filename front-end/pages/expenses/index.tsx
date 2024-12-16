import ExpenseService from '@services/ExpenseService';
import { useEffect, useState } from 'react';
import { Expense } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import ExpenseOverviewTable from '@components/expenses/ExpenseOverviewTable';

const Expenses: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>();
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [error, setError] = useState<string | null>(null);


    const getExpenses = async () => {
        const response = await ExpenseService.getExpenses();
        if (!response.ok) {
            if (response.status === 401) {
                setError('You are not authorized to view this page.');
            } else {
                setError(response.statusText);
            }
        } else {
            const expenses = await response.json();
            setExpenses(expenses);
        }
    };

    useEffect(() => {
        getExpenses();
    }, []);

    const selectExpense = (expense: Expense) => {
        setSelectedExpense(expense);
    };

    return (
        <>
            <Head>
                <title>Expenses</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Expenses</h1>
                <section>
                    <h2>Expenses overview</h2>
                    {error && <div className="text-center text-red-800">{error}</div>}

                    {expenses && (
                        <ExpenseOverviewTable expenses={expenses} selectExpense={selectExpense} />
                    )}
                </section>
                {/* {selectedExpense && (
                    <section>
                        <h2>Courses taught by {selectedExpense.user.firstName}</h2>
                        <CourseOverviewTable expense={selectedExpense} />
                    </section>
                )} */}
            </main>
        </>
    );
};

export default Expenses;
