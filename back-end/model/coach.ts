import { Coach as CoachPrisma } from '@prisma/client';

export class Coach {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;

    constructor(coach: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }) {
        this.validate(coach);

        this.id = coach.id;
        this.firstName = coach.firstName;
        this.lastName = coach.lastName;
        this.email = coach.email;
        this.phoneNumber = coach.phoneNumber;
    }

    validate(coach: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }) {
        if (!coach.firstName) {
            throw new Error('First name is required.');
        }

        if (!coach.lastName) {
            throw new Error('Last name is required.');
        }

        if (!coach.email) {
            throw new Error('Email is required.');
        }

        if (!coach.phoneNumber) {
            throw new Error('Phone number is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    static from({id, firstName, lastName, email, phoneNumber}: CoachPrisma) {
        return new Coach({
            id,
            firstName,
            lastName,
            email,
            phoneNumber
        });
    };
}
