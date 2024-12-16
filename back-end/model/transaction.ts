import { Account } from './account';
import { Account as AccountPrisma, Transaction as TransactionPrisma } from '@prisma/client';
import { TransactionType } from '../types';

export class Transaction {
    private id?: number;
    private amount: number;
    private currency: string;
    private sourceAccount: Account;
    private destinationAccount: Account;
    private date: Date;
    private referenceNumber: string;
    private type: TransactionType;

    constructor(transaction: {
        amount: number;
        currency: string;
        sourceAccount: Account;
        destinationAccount: Account;
        type: TransactionType;
        id?: number;
    }) {
        this.validate(transaction);
        this.id = transaction.id;
        this.amount = transaction.amount;
        this.currency = transaction.currency;
        this.sourceAccount = transaction.sourceAccount;
        this.destinationAccount = transaction.destinationAccount;
        this.type = transaction.type;
        this.date = new Date();
        this.referenceNumber = this.generateReferenceNumber(transaction.type);
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

    getSourceAccountId(): number | undefined {
        return this.sourceAccount.getId();
    }

    getDestinationAccountId(): number | undefined {
        return this.destinationAccount.getId();
    }

    getTransactionType(): TransactionType {
        return this.type;
    }

    validate(transaction: { amount: number; currency: string; id?: number }) {
        if (transaction.amount <= 0) {
            throw new Error('Amount must be greater than 0.');
        }
        if (
            transaction.currency !== 'USD' &&
            transaction.currency !== 'EUR' &&
            transaction.currency !== 'GBP'
        ) {
            throw new Error('Currency must be either USD, EUR or GBP.');
        }
    }

    generateReferenceNumber(type: string): string {
        const lastThreeNumbers = this.sourceAccount.getAccountNumber().split('').join(' ');
        const firstThreeLettType = type.slice(0, 3).toUpperCase();
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
        type,
        sourceAccount,
        destinationAccount,
    }: TransactionPrisma & { sourceAccount: AccountPrisma; destinationAccount: AccountPrisma }) {
        return new Transaction({
            id,
            amount,
            currency,
            sourceAccount: Account.from({ ...sourceAccount }),
            destinationAccount: Account.from({
                ...destinationAccount,
            }),
            type,
        });
    }
}
