export abstract class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;

    constructor(user: { id: number, name: string, email: string, password: string }) {
        this._id = user.id;
        this._name = user.name;
        this._email = user.email;
        this._password = user.password;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    equals(user: User): boolean {
        return (
            this.id === user.id &&
            this.name === user.name &&
            this.email === user.email &&
            this.password === user.password
        );
    }
}