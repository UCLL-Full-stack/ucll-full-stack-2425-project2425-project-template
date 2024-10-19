import { Account } from "./account";

export class Loan {
    private id?: number;
    private loanID: string;
    private type: string;
    private amount: number;
    private startDate: Date;
    private endDate: Date;
    private accounts: Account[];

    constructor(loan: {id?: number; loanID: string; type: string; amount: number; startDate: Date; endDate: Date; accounts: Account[]}) {
        this.id = loan.id
        this.loanID = loan.loanID;
        this.type = loan.type;
        this.amount = loan.amount;
        this.startDate = loan.startDate;
        this.endDate = loan.endDate;
        this.accounts = loan.accounts;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLoanID(): string {
        return this.loanID;
    }

    getType(): string {
        return this.type;
    }

    getAmount(): number {
        return this.amount;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getAccounts(): Account[] {
        return this.accounts;
    }
}
