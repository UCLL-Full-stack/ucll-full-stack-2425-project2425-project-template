import { Role } from '../types';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private signUpDate: Date;
    private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        signUpDate: Date;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.signUpDate = user.signUpDate;
        this.role = user.role;
    }

    validate(user: {
        id?: number;
        username: string;
        password: string;
        signUpDate: Date;
        role: Role;
    }) {
        // throw new Error("Method not implemented.");
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getSignUpDate(): Date {
        return this.signUpDate;
    }

    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.signUpDate.getTime() === user.getSignUpDate().getTime() &&
            this.role === user.getRole()
        );
    }
}
