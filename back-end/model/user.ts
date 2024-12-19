import { User as UserPrisma, Subscription as SubscriptionPrisma  } from '@prisma/client';
import { Role } from '../types';
import { Subscription } from './subscription';

export class User {
    private id?: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private role: Role;
    private password: string;
    private subscription?: Subscription;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: Role;
        password: string;
        subscription?: Subscription;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
        this.password = user.password;
        this.subscription = user.subscription;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
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

    getRole(): Role {
        return this.role;
    }

    getPassword(): string {
        return this.password;
    }
    getSubscription(): Subscription | undefined {
        return this.subscription;
    }

    validate(user: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: Role;
        password: string;
        subscription?: Subscription;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.role === user.getRole() &&
            this.password === user.getPassword() &&
            this.subscription === user.getSubscription()
        );
    }

    static from({
        id,
        username,
        firstName,
        lastName,
        email,
        role,
        password,
        subscription,
    }: UserPrisma & { subscription?: SubscriptionPrisma | null }): User {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            role: role as Role,
            password,
            subscription: subscription
                ? Subscription.from(subscription) 
                : undefined,
        });
    }
    
}