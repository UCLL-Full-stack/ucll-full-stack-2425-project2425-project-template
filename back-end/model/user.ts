export class User {
    readonly user_id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;

    constructor(user: { user_id: number; firstName: string; lastName: string; email: string; password: string }) {
        this.validate(user);
        this.user_id = user.user_id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }
    validate(user: { user_id: number; firstName: string; lastName: string; email: string; password: string; }) {
        if (typeof user.firstName !== 'string' || user.firstName.trim().length === 0) {
            throw new Error("First name cannot be empty.");
        }

        if (typeof user.lastName !== 'string' || user.lastName.trim().length === 0) {
            throw new Error("Last name cannot be empty.");
        }

        if (typeof user.email !== 'string' || user.email.trim().length === 0) {
            throw new Error("Email cannot be empty.");
        }

        if (typeof user.password !== 'string' || user.password.trim().length === 0) {
            throw new Error("Password cannot be empty.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // AI generated regex for email validation
        if (!emailRegex.test(user.email)) {
            throw new Error("Invalid Email: Must be a valid email address");
        }
    }

    equals({ user_id, firstName, lastName, email, password }: { user_id: number; firstName: string; lastName: string; email: string; password: string }): boolean {
        return (
            this.user_id === user_id &&
            this.firstName === firstName &&
            this.lastName === lastName &&
            this.email === email &&
            this.password === password
        );
    }
}
