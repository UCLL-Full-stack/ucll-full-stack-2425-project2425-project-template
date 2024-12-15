import { Expense } from '../model/expense';
import { Transaction } from '../model/transaction';
import database from '../util/database';

const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
    try {
        const transactionPrisma = await database.transaction.create({
            data: {
                referenceNumber: transaction.getReferenceNumber(),
                date: transaction.getDate(),
                amount: transaction.getAmount(),
                currency: transaction.getCurrency(),
                transactionType: transaction.getTransactionType(),
                sourceAccountNumber: transaction.getSourceAccount().toString(),
                destinationAccountNumber: transaction.getDestinationAccount().toString(),
            },
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });

        return Transaction.from({
            ...transactionPrisma,
            sourceAccount: transactionPrisma.sourceAccount,
            destinationAccount: transactionPrisma.destinationAccount,
        });
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

export default { createTransaction };
