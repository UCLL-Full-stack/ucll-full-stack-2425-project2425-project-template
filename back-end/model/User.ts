export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    // readonly recipies: Recipe[];
    // readonly reviews: Review[];

    constructor(username: string, password: string, email: string, firstName: string, lastName: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    equals(user: User): boolean {
        return this.username === user.username && this.email === user.email;
    }
}

export default { User };