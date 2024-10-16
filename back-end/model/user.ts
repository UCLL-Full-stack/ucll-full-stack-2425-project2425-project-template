import { Role } from '../types';

export class User {
    private _userId?: number;
    private _username: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _role: Role;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this._userId = user.id;
        this._username = user.username;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._email = user.email;
        this._password = user.password;
        this._role = user.role;
    }

    public getUserId(): number | undefined {
        return this._userId;
    }

    public setUserId(Id: number): void {
        this._userId = Id;
    }

    public getUsername(): string {
        return this._username;
    }

    public setUsername(username: string): void {
        this._username = username;
    }

    public getFirstName(): string {
        return this._firstName;
    }

    public setFirstName(firstName: string): void {
        this._firstName = firstName;
    }

    public getLastName(): string {
        return this._lastName;
    }

    public setLastName(lastName: string): void {
        this._lastName = lastName;
    }

    public getEmail(): string {
        return this._email;
    }

    public setEmail(email: string): void {
        this._email = email;
    }

    public getPassword(): string {
        return this._password;
    }

    public setPassword(password: string): void {
        this._password = password;
    }

    getRole(): Role {
        return this._role;
    }

    public setRole(role: Role): void {
        this._role = role;
    }

    equal(user: User): boolean {
        return (
            this._username === user.getUsername() &&
            this._firstName === user.getFirstName() &&
            this._lastName === user.getLastName() &&
            this._email === user.getEmail() &&
            this._password === user.getPassword() &&
            this._role === user.getRole()
        );
    }
}
