import { Role } from "../types";

export class User {
    private name: string;
    private email: string;
    private password: string;
    private role: Role;


    constructor(user: {name: string, email: string, password: string, role: Role}) {
        this.validate(user);

        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: {name: string, email: string, password: string, role: Role}) {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
       if (!user.name || user.name.trim().length < 1) {
        throw new Error("Name must not empty.");
       }
       
       if (!emailRegex.test(user.email)) {
        throw new Error("Email is not valid format.");
       }

       if (user.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.")
       }
    }

    getName(): String {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): String {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }
}
