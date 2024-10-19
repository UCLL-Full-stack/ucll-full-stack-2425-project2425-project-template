import { Account } from "./account";

export class Bank {
    private id?: number;
    private bankName: string;
    private phoneNumber: string;
    private address: string;
    private accounts: Account[];

    constructor(bank: { id?: number; bankName: string; phoneNumber: string; address: string; accounts: Account[] }) {
        this.id = bank.id;
        this.bankName = bank.bankName;
        this.phoneNumber = bank.phoneNumber;
        this.address = bank.address;
        this.accounts = bank.accounts;
    }

    getId(): number | undefined {
        return this.id;
    }

    getBankName(): string {
        return this.bankName;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getAddress(): string {
        return this.address;
    }

    getAccounts(): Account[] {
        return this.accounts;
    }
}
