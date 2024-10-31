export abstract class User {
    private readonly _id?: number;
    private readonly _name: string;
    private readonly _email: string;
    private readonly _password: string;

    constructor(user: { id: number, name: string, email: string, password: string }) {
        this.validate(user);
        this._id = user.id;
        this._name = user.name;
        this._email = user.email;
        this._password = user.password;
    }

    validate(user: {name: string; email: string; password: string}) {
        if (!user.name || user.name.length=== 0){
            throw new Error("Name is required.")
        }
        if (!user.email || user.email.length=== 0){
            throw new Error("Email is required.")
        }
        if (!user.password || user.password.length=== 0){
            throw new Error("Password is required.")
        }
    }

    get id(): number| undefined {
        return this._id;
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

    equals(user: User): boolean {
        return (
            this.id === user.id &&
            this.name === user.name &&
            this.email === user.email &&
            this.password === user.password
        );
    }
}