//import { Role } from '../types';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    //private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        //role: Role;
    }) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        //this.role = user.role;
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



    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }
}
