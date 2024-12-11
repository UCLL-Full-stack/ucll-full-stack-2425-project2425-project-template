import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private birthday: Date;
    private accountBirthday?: Date; // will be added by the database (dunno if possible)

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        birthday: Date;
        accountBirthday?: Date;
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.birthday = user.birthday;
        this.accountBirthday = user.accountBirthday;
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
        if (!user.name) {
            throw new Error('Name is required.');
        }
        if (!user.email) {
            throw new Error('E-mail is required');
        }

        if (!this.emailRegex(user.email)) {
            throw new Error('E-mail is incorrect.');
        }

        if (!user.password) {
            throw new Error('Password is required');
        }
        if (!user.birthday) {
            throw new Error('Birthday is required');
        }
    }

    emailRegex(email: string) {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(email);
    }

    static from({ id, name, email, password, birthday, accountBirthday }: UserPrisma) {
        return new User({
            id,
            name,
            email,
            password,
            birthday,
            accountBirthday,
        });
    }
}
