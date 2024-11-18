import { User as GebruikerPrisma } from '@prisma/client';

export class Gebruiker {
    readonly id?: number;
    readonly username: string;
    readonly password: string;

    constructor(gebruiker: { username: string, password: string, id?: number }) {
        this.validate(gebruiker);
        this.username = gebruiker.username;
        this.password = gebruiker.password;
        if (gebruiker.id) this.id = gebruiker.id;
    }

    validate(gebruiker: { username: string, password: string, id?: number }): void {
        if (!gebruiker.username) {
            throw new Error('Username is required');
        }
        if (!gebruiker.password) {
            throw new Error('Password is required');
        }
    }

    equals({ id, username, password }: { id?: number, username: string, password: string }): boolean {
        return (
            this.id === id &&
            this.username === username &&
            this.password === password
        );
    }

    static from({
        id,
        username,
        password,
    }: GebruikerPrisma) {
        return new Gebruiker({
            id,
            username,
            password,
        });
    }
}