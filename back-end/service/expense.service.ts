import accountDb from '../repository/account.db';
import expenseDb from '../repository/expense.db';
import incomeDb from '../repository/income.db';
import { ExpenseInput } from '../types';
import { Expense } from '../model/expense';
import { Income } from '../model/income';

const createExpense = async (ExpenseInput: ExpenseInput): Promise<Expense> => {
    const { amount, currency, sourceAccountNumber, destinationAccountNumber } = ExpenseInput;

    const sourceAccount = await accountDb.getAccountByAccountNumber(sourceAccountNumber);
    const destinationAccount = await accountDb.getAccountByAccountNumber(destinationAccountNumber);

    if (!sourceAccount) {
        throw new Error(`Source account with account number ${sourceAccountNumber} not found.`);
    }

    if (!destinationAccount) {
        throw new Error(
            `Destination account with account number ${destinationAccountNumber} not found.`
        );
    }

    sourceAccount.calculateBalance(amount, 'expense');
    destinationAccount.calculateBalance(amount, 'income');

    await accountDb.updateAccount(sourceAccount);
    await accountDb.updateAccount(destinationAccount);

    const expenseTransaction = new Expense({
        amount,
        currency,
        sourceAccount: sourceAccount,
        destinationAccount: destinationAccount,
    });

    const incomeTransaction = new Income({
        amount,
        currency,
        sourceAccount: sourceAccount,
        destinationAccount: destinationAccount,
    });

    const createdExpense = await expenseDb.createExpense(expenseTransaction);
    const createdIncome = await incomeDb.createIncome(incomeTransaction);

    return createdExpense;
};

export default {
    createExpense,
};
