import { Transaction } from './transaction';
import { Account } from './account';
import { TransactionType } from '../types';

export class Income extends Transaction {
    private source: string;

    constructor(income: {
        amount: number;
        currency: string;
        source: string;
        account: Account;
        id?: number;
    }) {
        super({
            amount: income.amount,
            currency: income.currency,
            transactionType: 'Income' as TransactionType,
            account: income.account,
            id: income.id,
        });
        this.validateIncome(income);
        this.source = income.source;
    }

    getSource(): string {
        return this.source;
    }

    validateIncome(income: { source: string }) {
        if (!income.source?.trim()) {
            throw new Error('Source is required');
        }
    }

    static from({
        id,
        amount,
        currency,
        source,
        account,
    }: {
        id?: number;
        amount: number;
        currency: string;
        source: string;
        account: Account;
    }) {
        return new Income({
            id,
            amount,
            currency,
            source,
            account,
        });
    }
}
