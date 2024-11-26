import { Transaction } from './transaction';
import { Account } from './account';
import { TransactionType } from '../types';

export class Expense extends Transaction {
    private destination: string;

    constructor(expense: {
        amount: number;
        currency: string;
        destination: string;
        account: Account;
        id?: number;
    }) {
        super({
            amount: expense.amount,
            currency: expense.currency,
            transactionType: 'Expense' as TransactionType,
            account: expense.account,
            id: expense.id,
        });
        this.validateExpense(expense);
        this.destination = expense.destination;
    }

    getDestination(): string {
        return this.destination;
    }

    validateExpense(expense: { destination: string }) {
        if (!expense.destination?.trim()) {
            throw new Error('Destination is required');
        }
    }

    static from({
        id,
        amount,
        currency,
        destination,
        account,
    }: {
        id?: number;
        amount: number;
        currency: string;
        destination: string;
        account: Account;
    }) {
        return new Expense({
            id,
            amount,
            currency,
            destination,
            account,
        });
    }
}
