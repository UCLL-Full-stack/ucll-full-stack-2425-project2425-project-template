import { Account } from './account';

export class User {
    public id?: number;
    public nationalRegisterNumber: string;
    public name: string;
    public birthDate: Date;
    public isAdministrator: boolean;
    public phoneNumber: string;
    public email: string;
    public password: string;
    public accounts: Account[];

    constructor(user: {
        id?: number;
        nationalRegisterNumber: string;
        name: string;
        birthDate: Date;
        isAdministrator: boolean;
        phoneNumber: string;
        email: string;
        password: string;
    }) {
        this.validate(user);
        this.id = user.id;
        this.nationalRegisterNumber = user.nationalRegisterNumber;
        this.name = user.name;
        this.birthDate = user.birthDate;
        this.isAdministrator = user.isAdministrator;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.password = user.password;
        this.accounts = [];
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

    getBirthDate(): Date {
        return this.birthDate;
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
        id?: number;
        nationalRegisterNumber: string;
        name: string;
        birthDate: Date;
        isAdministrator: boolean;
        phoneNumber: string;
        email: string;
        password: string;
    }) {
        // Validate national register number
        const nrnPattern =
            /^([0-9]{2}).([0][1-9]|[1][0-2]).([0-2][0-9]|[3][01])-([0-9]{3}).([0-9]{2})$/;
        if (!user.nationalRegisterNumber) {
            throw new Error('National register number is required.');
        } else if (!nrnPattern.test(user.nationalRegisterNumber)) {
            throw new Error('Invalid national register number format.');
        }

        // Validate name
        if (!user.name) {
            throw new Error('Name is required.');
        }

        // Validate birth date
        if (!user.birthDate) {
            throw new Error('Birth date is required.');
        } else if (user.birthDate > new Date()) {
            throw new Error('Birth date cannot be in the future.');
        }

        // Validate phone number
        const phonePattern = /^(?:(?:\+32|0)\s?)?(?:[1-9]{1}\d{1})(?:[\s.-]?\d{2,3}){3}$/;
        if (!user.phoneNumber) {
            throw new Error('Phone number is required.');
        } else if (!phonePattern.test(user.phoneNumber)) {
            throw new Error('Invalid phone number format.');
        }

        // Validate email
        if (!user.email) {
            throw new Error('Email is required.');
        } else if (!/@.*\./.test(user.email)) {
            throw new Error('Invalid email format: must contain "@" and a ".".');
        }

        // Validate password
        if (!user.password) {
            throw new Error('Password is required.');
        } else if (user.password.length < 8) {
            throw new Error('Password must be at least 8 characters long.');
        } else if (!/[A-Z]/.test(user.password)) {
            throw new Error('Password must contain at least one uppercase letter.');
        } else if (!/[a-z]/.test(user.password)) {
            throw new Error('Password must contain at least one lowercase letter.');
        } else if (!/[0-9]/.test(user.password)) {
            throw new Error('Password must contain at least one number.');
        } else if (!/[!@#\$%\^&\*]/.test(user.password)) {
            throw new Error('Password must contain at least one special character (!@#$%^&*).');
        }
    }
}
