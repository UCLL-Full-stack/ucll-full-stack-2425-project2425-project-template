import { Gebruiker } from './Gebruiker';

export class User extends Gebruiker {
    constructor(user: { username: string, password: string, id?: number }) {
        super({ username: user.username, password: user.password, id: user.id });
        this.validate(user);
    }
}