export class User {
    readonly id: number;
    private _name: string;
    private _email: string;
    private _password: string;
   
    constructor(user: { id: number, name: string, email: string, password: string }) {
        this.id = user.id;
        this._name = user.name;
        this._email = user.email;
        this._password = user.password;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    set name(newName: string) {
        this._name = newName;
    }

    set email(newEmail: string) {
        this._email = newEmail;
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }

    equals(otherUser: User): boolean {
        return (
            this.id === otherUser.id &&
            this.name === otherUser.name &&
            this.email === otherUser.email &&
            this.password === otherUser.password
        );
    }
}