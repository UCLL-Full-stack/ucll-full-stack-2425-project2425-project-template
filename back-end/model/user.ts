import { Role } from '../types';

export class User {
    private id?: number;
    private name: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        name: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.role = user.role;
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

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        name: string;
        password: string;
        role: Role;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.name === user.getName() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
}
