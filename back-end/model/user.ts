export class User {
    readonly user_id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;

    constructor(user: { user_id: number; firstName: string; lastName: string; email: string; password: string }) {
        this.user_id = user.user_id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
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
