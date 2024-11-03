import { Transaction } from './transaction';
import { Account } from './account';

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
            transactionType: 'income',
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
            throw new Error('source is required');
        }
    }
}
