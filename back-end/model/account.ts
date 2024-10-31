import { User } from './user';
import { Budgetgoal } from './budgetgoal';
import { Loan } from './loan';
import { Transaction } from './transaction';

export class Account {
    private id?: number;
    private accountNumber: string;
    private balance: number;
    private isShared: boolean;
    private startDate: Date;
    private endDate: Date | null;
    private status: string;
    private type: string;
    private transactions: Transaction[];
    private users: User[];
    private loans: Loan[];
    private budgetgoals: Budgetgoal[];

    constructor(account: { isShared: boolean; type: string; id?: number }) {
        this.validate(account);
        this.id = account.id;
        this.accountNumber = this.generateAccountNumber();
        this.balance = 0;
        this.isShared = account.isShared;
        this.startDate = new Date();
        this.endDate = null;
        this.status = 'Active';
        this.type = account.type;
        this.transactions = [];
        this.users = [];
        this.loans = [];
        this.budgetgoals = [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }

    getBalance(): number {
        return this.balance;
    }

    getIsShared(): boolean {
        return this.isShared;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date | null {
        return this.endDate;
    }

    getStatus(): string {
        return this.status;
    }

    getType(): string {
        return this.type;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    getUsers(): User[] {
        return this.users;
    }

    getLoans(): Loan[] {
        return this.loans;
    }

    getBudgetgoals(): Budgetgoal[] {
        return this.budgetgoals;
    }

    validate(account: { isShared: boolean; type: string; id?: number }) {
        if (account.isShared === undefined) {
            throw new Error('Is shared is required.');
        }
        if (!account.type) {
            throw new Error('Type is required.');
        }
    }

    generateAccountNumber(): string {
        const today = this.startDate.toISOString().split('T')[0].replace(/-/g, '');
        const type = this.type.substring(0, 3).toUpperCase();
        const randomNumbers = Math.floor(100 + Math.random() * 900);

        return `${today}-${type}-${randomNumbers}`;
    }
}
