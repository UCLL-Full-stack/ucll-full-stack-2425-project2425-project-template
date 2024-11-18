import { Gebruiker } from './gebruiker';

export class Admin extends Gebruiker {
    constructor(admin: { username: string, password: string, id?: number }) {
        super({ username: admin.username, password: admin.password, id: admin.id });
        this.validate(admin);
    }
}