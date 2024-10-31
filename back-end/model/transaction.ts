import { Account } from './account';

export abstract class Transaction {
    private id?: number;
    private referenceNumber: string;
    private date: Date;
    private amount: number;
    private currency: string;
    private type: string;
    private account: Account;

    constructor(transaction: {
        referenceNumber: string;
        date: Date;
        amount: number;
        currency: string;
        type: string;
        account: Account;
        id?: number;
    }) {
        this.validate(transaction);
        this.id = transaction.id;
        this.referenceNumber = this.generateReferenceNumber();
        this.date = transaction.date;
        this.amount = transaction.amount;
        this.currency = transaction.currency;
        this.type = transaction.type;
        this.account = transaction.account;
    }

    getId(): number | undefined {
        return this.id;
    }

    geReferenceNumber(): string {
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

    getType(): string {
        return this.type;
    }

    getAccount(): Account {
        return this.account;
    }

    validate(transaction: {
        date: Date;
        amount: number;
        currency: string;
        type: string;
        id?: number;
    }) {
        if (!transaction.date) {
            throw new Error('Date is required.');
        } else if (transaction.date > new Date()) {
            throw new Error('Date cannot be in the future.');
        }
        if (!transaction.amount) {
            throw new Error('Amount is required.');
        } else if (transaction.amount <= 0) {
            throw new Error('Amount must be greater than 0.');
        }
        if (!transaction.currency) {
            throw new Error('Currency is required.');
        } else if (
            transaction.currency !== 'USD' &&
            transaction.currency !== 'EUR' &&
            transaction.currency !== 'GBP'
        ) {
            throw new Error('Currency must be either USD, EUR or GBP.');
        }
        if (!transaction.type) {
            throw new Error('Type is required.');
        } else if (transaction.type !== 'income' && transaction.type !== 'expense') {
            throw new Error('Type must be either income or expense.');
        }
    }

    generateReferenceNumber(): string {
        const lastThreeNumbers = this.account.getAccountNumber().slice(-3).split('').join(' ');
        const firstTwoLettType = this.type.slice(0, 2).toUpperCase();
        const year = this.date.getUTCFullYear().toString();
        const uniqueNumber =
            Date.now().toString().slice(-3) + Math.random().toString().substring(2, 5);
        const referenceNumber = `${firstTwoLettType}-${lastThreeNumbers}-${year}-${uniqueNumber}`;
        return referenceNumber;
    }
}
