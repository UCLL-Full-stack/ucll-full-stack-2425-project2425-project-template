import { Transaction } from './transaction';

export class Expense extends Transaction {
    private destination: string;

    constructor(expense: {
        referenceNumber: string;
        date: Date;
        amount: number;
        currency: string;
        type: string;
        destination: string;
        id?: number;
    }) {
        super(expense);
        this.validate(expense);
        this.destination = expense.destination;
    }

    getDestination(): string {
        return this.destination;
    }

    validate(expense: {
        referenceNumber: string;
        date: Date;
        amount: number;
        currency: string;
        type: string;
        destination: string;
        id?: number;
    }) {
        if (!expense.destination) {
            throw new Error('Destination is required.');
        }
    }

    makeExpense(destination: string) {
        //
    }
}
