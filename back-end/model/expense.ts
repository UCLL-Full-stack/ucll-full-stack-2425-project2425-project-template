import { Transaction } from './transaction';
import { Account } from './account';

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
            transactionType: 'expense',
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
}
