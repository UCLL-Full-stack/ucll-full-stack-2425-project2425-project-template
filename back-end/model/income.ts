import { Transaction } from './transaction';
import { Account } from './account';
import { TransactionType } from '../types';

export class Income extends Transaction {
    constructor(income: {
        amount: number;
        currency: string;
        sourceAccount: Account;
        destinationAccount: Account;
        id?: number;
    }) {
        super({
            amount: income.amount,
            currency: income.currency,
            transactionType: 'INCOME' as TransactionType,
            sourceAccount: income.sourceAccount,
            destinationAccount: income.destinationAccount,
            id: income.id,
        });
    }

    static from({
        id,
        amount,
        currency,
        sourceAccount,
        destinationAccount,
    }: {
        id?: number;
        amount: number;
        currency: string;
        sourceAccount: Account;
        destinationAccount: Account;
    }) {
        return new Income({
            id,
            amount,
            currency,
            sourceAccount,
            destinationAccount,
        });
    }
}
