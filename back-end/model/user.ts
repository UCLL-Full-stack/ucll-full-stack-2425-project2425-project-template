import { Role } from '../types';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private role: Role;

    constructor(user: { id?: number; username: string; password: string; role: Role; }) {
        
        
        if (!user.username || user.username.trim() === "") {
            throw new Error("Username cannot be empty.");
        }
        if (!user.password || user.password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        if (!user.role) {
            throw new Error("Role is required.");
        }

        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    // Business validation method
    isAdmin(): boolean {
        return this.role === "admin";
    }

    isCaretaker(): boolean {
        return this.role === "caretaker";
    }

    isVisitor(): boolean {
        return this.role === "visitor";
    }
}
