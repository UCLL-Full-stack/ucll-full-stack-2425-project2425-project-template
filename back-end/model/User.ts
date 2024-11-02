import { Recipe } from './Recipe';
import { Review } from './Review';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly recipies: Recipe[];
    readonly reviews: Review[];

    constructor(username: string, password: string, email: string, firstName: string, lastName: string, recipes: Recipe[], reviews: Review[]) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.recipies = recipes;
        this.reviews = reviews;
    }

    equals(user: User): boolean {
        return this.username === user.username && this.email === user.email;
    }
}

export default { User };