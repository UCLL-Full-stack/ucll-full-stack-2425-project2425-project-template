export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private birthday: Date;
    private accountBirthday?: Date; // will be added by the database (dunno if possible)

    constructor(user: { name: string; email: string; password: string; birthday: Date }) {
        this.validate(user);

        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.birthday = user.birthday;
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

    getPassword(): string {
        return this.password;
    }

    getBirthday(): Date {
        return this.birthday;
    }

    getAccountBirthday(): Date | undefined {
        return this.accountBirthday;
    }

    validate(user: { name: string; email: string; password: string; birthday: Date }) {
        // will be implemented later
    }
}
