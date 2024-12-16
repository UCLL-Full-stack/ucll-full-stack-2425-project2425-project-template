import { Account } from '../model/account';
import { Expense } from '../model/expense';
import database from '../util/database';

const createExpense = async (expense: Expense): Promise<Expense> => {
    try {
        const expensePrisma = await database.expense.create({
            data: {
                referenceNumber: expense.getReferenceNumber(),
                date: expense.getDate(),
                amount: expense.getAmount(),
                currency: expense.getCurrency(),
                sourceAccountId: expense.getSourceAccount().getId(),
                destinationAccountId: expense.getDestinationAccount().getId(),
            },
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });

        return Expense.from({
            ...expensePrisma,
            sourceAccount: Account.from({
                ...expensePrisma.sourceAccount,
                transactions: [],
                users: [],
            }),
            destinationAccount: Account.from({
                ...expensePrisma.destinationAccount,
                transactions: [],
                users: [],
            }),
        });
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

export default { createExpense };
