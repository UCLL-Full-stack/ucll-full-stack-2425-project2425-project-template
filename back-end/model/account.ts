import { User } from './user';
// import { Budgetgoal } from './budgetgoal';
// import { Loan } from './loan';
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
    // public loans: Loan[];
    // public budgetgoals: Budgetgoal[];

    constructor(account: {
        id?: number;
        isShared: boolean;
        type: string;
        users: User[];
        balance?: number;
        startDate?: Date;
        endDate?: Date | null;
        status?: string;
    }) {
        this.validate(account);

        this.id = account.id;
        this.type = account.type;
        this.accountNumber = this.generateAccountNumber();
        this.balance = account.balance || 0; // Set default balance
        this.isShared = account.isShared;
        this.startDate = account.startDate || new Date(); // Set default to now
        this.endDate = account.endDate || null; // Default to null
        this.status = account.status || 'Active'; // Default to 'Active'
        this.transactions = [];
        this.users = account.users;
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

    validate(account: { isShared: boolean; type: string; users: User[]; id?: number }) {
        const validTypes = ['transaction', 'savings', 'emergency fund'];

        if (account.isShared && account.users.length < 2) {
            throw new Error('Shared accounts must have at least two users.');
        } else if (!account.isShared && account.users.length > 1) {
            throw new Error('A personal account can only have one user.');
        }
        if (!account.type?.trim()) {
            throw new Error('Account type is required.');
        } else if (!validTypes.includes(account.type.toLowerCase())) {
            throw new Error(
                `Invalid account type. Valid types are: ${validTypes.join(' account, ')} account.`
            );
        }
        if (account.users.length === 0) {
            throw new Error('An account must have at least one user.');
        }
    }

    generateAccountNumber(): string {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const type = this.type.substring(0, 3).toUpperCase();
        const randomNumbers = Math.floor(100 + Math.random() * 900);

        return `${today}-${type}-${randomNumbers}`;
    }
}
