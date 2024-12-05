import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private role: Role;
    private password: string

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        role: Role;
        password: string;
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
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

    validate(user: {
        name: string;
        email: string;
        role: Role;
        password: string;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.role === user.getRole() &&
            this.password === user.getPassword()
        );
    }

    static from({ id, name, email, role, password }: UserPrisma) {
        return new User({
            id,
            name,
            email,
            role: role as Role,
            password,
        });
    }
}