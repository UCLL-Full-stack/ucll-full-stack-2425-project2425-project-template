import { Gebruiker } from './Gebruiker';

export class User extends Gebruiker {
    constructor(username: string, password: string, id?: number) {
        super(username, password, id);
    }

    equals(other: User): boolean {
        return super.equals(other);
    }
}