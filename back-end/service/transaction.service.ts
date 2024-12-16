import accountDb from '../repository/account.db';
import transactionDb from '../repository/transaction.db';
import { TransactionInput } from '../types';
import { Transaction } from '../model/transaction';

const createExpense = async (ExpenseInput: TransactionInput): Promise<Transaction> => {
    const { amount, currency, sourceAccountNumber, destinationAccountNumber, type } = ExpenseInput;

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

    const expenseTransaction = new Transaction({
        amount,
        currency,
        sourceAccount: sourceAccount,
        destinationAccount: destinationAccount,
        type: 'expense',
    });

    const incomeTransaction = new Transaction({
        amount,
        currency,
        sourceAccount: sourceAccount,
        destinationAccount: destinationAccount,
        type: 'income',
    });

    const createdExpense = await transactionDb.createTransaction(expenseTransaction);
    const createdIncome = await transactionDb.createTransaction(incomeTransaction);

    return createdExpense;
};

export default {
    createExpense,
};
