import { Account as AccountPrisma, Transaction as TransactionPrisma } from '@prisma/client';
import { Account } from './account';
import { TransactionType } from '../types';
import { Income } from './income';
import { Expense } from './expense';

export abstract class Transaction {
    private id?: number;
    private referenceNumber: string;
    private date: Date;
    private amount: number;
    private currency: string;
    private transactionType: TransactionType;
    private sourceAccount: Account;
    private destinationAccount: Account;

    constructor(transaction: {
        amount: number;
        currency: string;
        transactionType: TransactionType;
        sourceAccount: Account;
        destinationAccount: Account;
        id?: number;
    }) {
        this.validate(transaction);
        this.id = transaction.id;
        this.transactionType = transaction.transactionType;
        this.sourceAccount = transaction.sourceAccount;
        this.destinationAccount = transaction.destinationAccount;
        this.date = new Date();
        this.referenceNumber = this.generateReferenceNumber();
        this.amount = transaction.amount;
        this.currency = transaction.currency;
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

    getTransactionType(): TransactionType {
        return this.transactionType;
    }

    getSourceAccount(): Account {
        return this.sourceAccount;
    }

    getDestinationAccount(): Account {
        return this.destinationAccount;
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
        if (transaction.transactionType !== 'INCOME' && transaction.transactionType !== 'EXPENSE') {
            throw new Error('Type must be either income or expense.');
        }
    }

    generateReferenceNumber(): string {
        const lastThreeNumbers = this.sourceAccount
            .getAccountNumber()
            .slice(-3)
            .split('')
            .join(' ');
        const firstTwoLettType = this.transactionType.substring(0, 3).toUpperCase();
        const year = this.date.getUTCFullYear().toString();
        const uniqueNumber =
            Date.now().toString().slice(-3) + Math.random().toString().substring(2, 5);
        const referenceNumber = `${firstTwoLettType}-${lastThreeNumbers}-${year}-${uniqueNumber}`;
        return referenceNumber;
    }

    static from({
        id,
        amount,
        currency,
        transactionType,
        sourceAccount,
        destinationAccount,
        referenceNumber,
        date,
    }: TransactionPrisma & { sourceAccount: AccountPrisma; destinationAccount: AccountPrisma }) {
        if (transactionType === 'INCOME') {
            return new Income({
                id,
                amount,
                currency,
                sourceAccount: Account.from(sourceAccount),
                destinationAccount: Account.from(destinationAccount),
            });
        } else {
            return new Expense({
                id,
                amount,
                currency,
                sourceAccount: Account.from(sourceAccount),
                destinationAccount: Account.from(destinationAccount),
            });
        }
    }
}
