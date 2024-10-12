import { Profile } from './profile';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private profile?: Profile;

    constructor(user: { id?: number; username: string; password: string; profile?: Profile }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.profile = user.profile;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    equals(user: User): boolean {
        return this.username === user.getUsername() && this.password === user.getPassword();
    }
}
