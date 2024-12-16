import { Account } from '../model/account';
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
                sourceAccountId: transaction.getSourceAccount().getId(),
                destinationAccountId: transaction.getDestinationAccount().getId(),
                type: transaction.getTransactionType(),
            },
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });

        return Transaction.from(transactionPrisma);
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

export default { createTransaction };
