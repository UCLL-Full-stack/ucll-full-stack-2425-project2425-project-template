import { Gebruiker } from './Gebruiker';

export class Admin extends Gebruiker {
    constructor(username: string, password: string, id?: number) {
        super(username, password, id);
    }

    equals(other: Admin): boolean {
        return super.equals(other);
    }
}