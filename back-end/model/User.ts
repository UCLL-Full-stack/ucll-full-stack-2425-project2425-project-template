import { Recipe } from './Recipe';
import { Review } from './Review';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly recipes: Recipe[];
    readonly reviews: Review[];

    constructor(username: string, password: string, email: string, firstName: string, lastName: string, recipes: Recipe[], reviews: Review[]) {
        this.validate({ username, password, email, firstName, lastName });
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.recipes = recipes;
        this.reviews = reviews;
    }

    validate(user: { username: string; password: string; email: string; firstName: string; lastName: string }) {
        if (!user.username) {
            throw new Error("Username is required");
        }
        if (user.username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        }
        
        if (!user.password) {
            throw new Error("Password is required");
        }
        if (user.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!user.email) {
            throw new Error("Email is required");
        }
        if (!emailRegex.test(user.email)) {
            throw new Error("Invalid email format");
        }

        if (!user.firstName) {
            throw new Error("First name is required");
        }

        if (!user.lastName) {
            throw new Error("Last name is required");
        }
    }

    equals(user: User): boolean {
        return this.username === user.username && this.email === user.email;
    }
}
