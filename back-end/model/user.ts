import { User as UserPrisma, Profile as ProfilePrisma } from '@prisma/client';
import { Role } from '../types';
import { Profile } from './profile';

export class User {
    readonly id?: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly profile?: Profile;

    constructor(user: {
        id?: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        profile?: Profile;
    }) {
        this.validate(user);
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.profile = user.profile;
    }

    validate(user: {
        id?: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        profile?: Profile;
    }) {
        if (
            !user.firstName ||
            typeof user.firstName !== 'string' ||
            user.firstName.trim().length === 0
        ) {
            throw new Error('First name cannot be empty.');
        }
        if (
            !user.lastName ||
            typeof user.lastName !== 'string' ||
            user.lastName.trim().length === 0
        ) {
            throw new Error('Last name cannot be empty.');
        }
        if (!user.email || typeof user.email !== 'string' || user.email.trim().length === 0) {
            throw new Error('Email cannot be empty.');
        }
        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('Invalid Email: Must be a valid email address');
        }
        if (
            !user.password ||
            typeof user.password !== 'string' ||
            user.password.trim().length === 0
        ) {
            throw new Error('Password cannot be empty.');
        }
        if (!user.role) {
            throw new Error('Role is required.');
        }
    }

    equals({
        id,
        firstName,
        lastName,
        email,
        password,
        role,
        profile,
    }: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        profile?: Profile;
    }): boolean {
        return (
            this.id === id &&
            this.firstName === firstName &&
            this.lastName === lastName &&
            this.email === email &&
            this.password === password &&
            this.role === role &&
            this.profile === profile
        );
    }

    static from({
        id,
        firstName,
        lastName,
        email,
        password,
        role,
        profile,
    }: UserPrisma & { profile?: ProfilePrisma | null }): User {
        return new User({
            id,
            firstName,
            lastName,
            email,
            password,
            role: role as Role,
            profile: profile ? Profile.from(profile) : undefined,
        });
    }
}
