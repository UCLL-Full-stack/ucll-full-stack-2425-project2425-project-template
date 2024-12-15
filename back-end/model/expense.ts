import { Transaction } from './transaction';
import { Account } from './account';
import { TransactionType } from '../types';

export class Expense extends Transaction {
    constructor(expense: {
        amount: number;
        currency: string;
        sourceAccount: Account;
        destinationAccount: Account;
        id?: number;
    }) {
        super({
            amount: expense.amount,
            currency: expense.currency,
            transactionType: 'EXPENSE' as TransactionType,
            sourceAccount: expense.sourceAccount,
            destinationAccount: expense.destinationAccount,
            id: expense.id,
        });
    }

    static from({
        id,
        amount,
        currency,
        destinationAccount,
        sourceAccount,
    }: {
        id?: number;
        amount: number;
        currency: string;
        destinationAccount: Account;
        sourceAccount: Account;
    }) {
        return new Expense({
            id,
            amount,
            currency,
            destinationAccount,
            sourceAccount,
        });
    }
}
