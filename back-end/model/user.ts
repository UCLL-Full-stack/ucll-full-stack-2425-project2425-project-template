import { Account } from './account';

export class User {
    private id?: number;
    private nationalRegisterNumber: string;
    private name: string;
    private isAdministrator: boolean;
    private phoneNumber: string;
    private email: string;
    private password: string;
    private accounts: Account[];

    constructor(user: {
        nationalRegisterNumber: string;
        name: string;
        isAdministrator: boolean;
        phoneNumber: string;
        email: string;
        password: string;
        accounts: Account[];
        id?: number;
    }) {
        this.validate(user);
        this.id = user.id;
        this.nationalRegisterNumber = user.nationalRegisterNumber;
        this.name = user.name;
        this.isAdministrator = user.isAdministrator;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.password = user.password;
        this.accounts = user.accounts || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getNationalRegisterNumber(): string {
        return this.nationalRegisterNumber;
    }

    getName(): string {
        return this.name;
    }

    getIsAdministrator(): boolean {
        return this.isAdministrator;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getAccounts(): Account[] {
        return this.accounts;
    }

    validate(user: {
        nationalRegisterNumber: string;
        name: string;
        isAdministrator: boolean;
        phoneNumber: string;
        email: string;
        password: string;
        id?: number;
    }) {
        if (!user.nationalRegisterNumber) {
            throw new Error('National register number is required.');
        }
        if (!user.name) {
            throw new Error('Name is required.');
        }
        if (!user.isAdministrator) {
            throw new Error('Administrator status is required.');
        }
        if (!user.phoneNumber) {
            throw new Error('Phone number is required.');
        }
        if (!user.email) {
            throw new Error('Email is required.');
        }
        if (!user.password) {
            throw new Error('Password is required.');
        }
    }
}
