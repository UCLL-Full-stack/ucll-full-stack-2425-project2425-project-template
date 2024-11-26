import { Account as AccountPrisma, Transaction as TransactionPrisma }
import { Account } from './account';
import { TransactionType } from '../types';
export abstract class Transaction {
    private id?: number;
    private referenceNumber: string;
    private date: Date;
    private amount: number;
    private currency: string;
    private transactionType: TransactionType;
    private account: Account;

    constructor(transaction: {
        amount: number;
        currency: string;
        transactionType: TransactionType;
        account: Account;
        id?: number;
    }) {
        this.validate(transaction);
        this.id = transaction.id;
        this.transactionType = transaction.transactionType;
        this.account = transaction.account;
        this.date = new Date();
        this.referenceNumber = this.generateReferenceNumber();
        this.amount = transaction.amount;
        this.currency = transaction.currency;
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

    getTransactionType(): TransactionType {
        return this.transactionType;
    }

    getAccount(): Account {
        return this.account;
    }

    validate(transaction: {
        amount: number;
        currency: string;
        transactionType: TransactionType;
        id?: number;
    }) {
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
        if (transaction.transactionType !== 'Income' && transaction.transactionType !== 'Expense') {
            throw new Error('Type must be either income or expense.');
        }
    }

    generateReferenceNumber(): string {
        const lastThreeNumbers = this.account.getAccountNumber().slice(-3).split('').join(' ');
        const firstTwoLettType = this.transactionType.substring(0, 3).toUpperCase();
        const year = this.date.getUTCFullYear().toString();
        const uniqueNumber =
            Date.now().toString().slice(-3) + Math.random().toString().substring(2, 5);
        const referenceNumber = `${firstTwoLettType}-${lastThreeNumbers}-${year}-${uniqueNumber}`;
        return referenceNumber;
    }
}
