import { Account } from './account';

export class Expense {
    private id?: number;
    private amount: number;
    private currency: string;
    private sourceAccount: Account;
    private destinationAccount: Account;
    private date: Date;
    private referenceNumber: string;

    constructor(expense: {
        amount: number;
        currency: string;
        sourceAccount: Account;
        destinationAccount: Account;
        id?: number;
    }) {
        this.validate(expense);
        this.id = expense.id;
        this.amount = expense.amount;
        this.currency = expense.currency;
        this.sourceAccount = expense.sourceAccount;
        this.destinationAccount = expense.destinationAccount;
        this.date = new Date();
        this.referenceNumber = this.generateReferenceNumber();
    }

    getId(): number | undefined {
        return this.id;
    }

    getReferenceNumber(): string {
        return this.referenceNumber;
    }

    getDate(): Date {
        return this.date;
    }

    getAmount(): number {
        return this.amount;
    }

    getCurrency(): string {
        return this.currency;
    }

    getSourceAccount(): Account {
        return this.sourceAccount;
    }

    getDestinationAccount(): Account {
        return this.destinationAccount;
    }

    getDestinationAccountId(): number | undefined {
        return this.destinationAccount.getId();
    }

    validate(expense: { amount: number; currency: string; id?: number }) {
        if (expense.amount <= 0) {
            throw new Error('Amount must be greater than 0.');
        }
        if (
            expense.currency !== 'USD' &&
            expense.currency !== 'EUR' &&
            expense.currency !== 'GBP'
        ) {
            throw new Error('Currency must be either USD, EUR or GBP.');
        }
    }

    generateReferenceNumber(): string {
        const lastThreeNumbers = this.sourceAccount
            .getAccountNumber()
            .slice(-3)
            .split('')
            .join(' ');
        const firstThreeLettType = 'EXP';
        const year = this.date.getUTCFullYear().toString();
        const uniqueNumber =
            Date.now().toString().slice(-3) + Math.random().toString().substring(2, 5);
        const referenceNumber = `${firstThreeLettType}-${lastThreeNumbers}-${year}-${uniqueNumber}`;
        return referenceNumber;
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
        return new Expense({
            id,
            amount,
            currency,
            sourceAccount,
            destinationAccount,
        });
    }
}
