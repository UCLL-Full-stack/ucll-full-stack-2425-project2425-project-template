import { Account as AccountPrisma } from '@prisma/client';
import { User } from './user';
import { Transaction } from './transaction';

export class Account {
    public id?: number;
    public accountNumber: string;
    public balance: number;
    public isShared: boolean;
    public startDate: Date;
    public endDate: Date | null;
    public status: string;
    public type: string;
    public transactions: Transaction[];
    public users: User[];

    constructor(account: {
        id?: number;
        isShared: boolean;
        type: string;
        // users?: User[];
        balance?: number;
        startDate?: Date;
        endDate?: Date | null;
        status?: string;
    }) {
        this.validate(account);

        this.id = account.id;
        this.type = account.type;
        this.accountNumber = this.generateAccountNumber();
        this.balance = account.balance || 0;
        this.isShared = account.isShared;
        this.startDate = account.startDate || new Date();
        this.endDate = account.endDate || null;
        this.status = account.status || 'Active';
        this.transactions = [];
        this.users = [];
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

    // getLoans(): Loan[] {
    //     return this.loans;
    // }

    // getBudgetgoals(): Budgetgoal[] {
    //     return this.budgetgoals;
    // }

    validate(account: { isShared: boolean; type: string; users?: User[]; id?: number }) {
        const validTypes = ['transaction', 'savings', 'emergency fund'];

        if (account.isShared && account.users && account.users.length < 2) {
            throw new Error('Shared accounts must have at least two users.');
        } else if (!account.isShared && account.users && account.users.length > 1) {
            throw new Error('A personal account can only have one user.');
        }
        if (!account.type?.trim()) {
            throw new Error('Account type is required.');
        } else if (!validTypes.includes(account.type.toLowerCase())) {
            throw new Error(
                `Invalid account type. Valid types are: ${validTypes.join(' account, ')} account.`
            );
        }
        if (account.users && account.users.length === 0) {
            throw new Error('An account must have at least one user.');
        }
    }

    generateAccountNumber(): string {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const type = this.type.substring(0, 3).toUpperCase();
        const randomNumbers = Math.floor(100 + Math.random() * 900);

        return `${today}-${type}-${randomNumbers}`;
    }

    addUser(user: User): void {
        if (
            this.users.find(
                (user) => user.getNationalRegisterNumber() === user.getNationalRegisterNumber()
            )
        ) {
            throw new Error(
                `User with national register number ${user.getNationalRegisterNumber()} has already been added to this account.`
            );
        }
        this.users.push(user);
    }

    toJSON() {
        return {
            id: this.id,
            accountNumber: this.accountNumber,
            balance: this.balance,
            isShared: this.isShared,
            startDate: this.startDate,
            endDate: this.endDate,
            status: this.status,
            type: this.type,
            transactions: this.transactions,
        };
    }

    
    static from({
        id,
        balance,
        isShared,
        startDate,
        endDate,
        status,
        type,
    }: AccountPrisma) {
        return new Account({
            id,
            balance,
            isShared,
            startDate,
            endDate,
            status,
            type
        });
    }
}

