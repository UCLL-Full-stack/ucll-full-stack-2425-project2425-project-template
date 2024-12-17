import { UserRole } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private name: string;
    private password: string;
    private email: string;
    private role: UserRole;

    constructor(user: {
        id?: number;
        name: string;
        password: string;
        email: string;
        role: UserRole;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
    }
    
    equals({ id, name, password, email, role }: User): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.password === password &&
            this.email === email &&
            this.role === role
        );
    }

    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getPassword(): string {
        return this.password;
    }
    getEmail(): string {
        return this.email;
    }
    getRole(): UserRole {
        return this.role;
    }

    static from({ id, name, password, email, role }: UserPrisma) {
        return new User({ id, name, password, email, role: role as UserRole });
    }
}
