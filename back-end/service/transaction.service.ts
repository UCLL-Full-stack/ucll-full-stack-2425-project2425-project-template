import accountDb from '../repository/account.db';
import transactionDb from '../repository/transaction.db';
import { TransactionInput, TransactionType } from '../types';
import { Transaction } from '../model/transaction';
import { Expense } from '../model/expense';
import { Income } from '../model/income';

const createTransaction = async (
    transactionInput: TransactionInput
): Promise<{ expense: Transaction; income: Transaction }> => {
    const { amount, currency, transactionType, sourceAccountNumber, destinationAccountNumber } =
        transactionInput;

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

    if (transactionType !== 'EXPENSE') {
        throw new Error('Invalid transaction type. Only EXPENSE transactions are supported.');
    }

    sourceAccount.calculateBalance(-amount);
    destinationAccount.calculateBalance(amount);

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

    const createdExpense = await transactionDb.createTransaction(expenseTransaction);
    const createdIncome = await transactionDb.createTransaction(incomeTransaction);

    return { expense: createdExpense, income: createdIncome };
};

export default {
    createTransaction,
};
