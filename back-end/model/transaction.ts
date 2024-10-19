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
        this.referenceNumber = transaction.referenceNumber;
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
        referenceNumber: string;
        date: Date;
        amount: number;
        currency: string;
        type: string;
        id?: number;
    }) {
        if (!transaction.referenceNumber) {
            throw new Error('Reference number is required.');
        }
        if (!transaction.date) {
            throw new Error('Date is required.');
        }
        if (!transaction.amount) {
            throw new Error('Amount is required.');
        }
        if (!transaction.currency) {
            throw new Error('Currency is required.');
        }
        if (!transaction.type) {
            throw new Error('Type is required.');
        }
    }
}
