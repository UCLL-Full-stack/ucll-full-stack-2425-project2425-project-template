import { Profile as ProfilePrisma, User as UserPrisma } from '@prisma/client';

export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;

    constructor(profile: { id?: number; firstName: string; lastName: string; email: string }) {
        this.validate(profile);
        this.id = profile.id;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
    }

    static from({ id, firstName, lastName, email }: ProfilePrisma): Profile {
        return new Profile({
            id,
            firstName,
            lastName,
            email,
        });
    }

    validate(profile: { id?: number; firstName: string; lastName: string; email: string }): void {
        if (profile.id !== undefined && (!Number.isInteger(profile.id) || profile.id <= 0)) {
            throw new Error('ID must be a positive integer');
        }
        if (!profile.firstName || profile.firstName.trim().length === 0) {
            throw new Error('First name is required and cannot be empty');
        }
        if (!profile.lastName || profile.lastName.trim().length === 0) {
            throw new Error('Last name is required and cannot be empty');
        }
        if (!profile.email || profile.email.trim().length === 0) {
            throw new Error('Email is required and cannot be empty');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        };
    }
}
