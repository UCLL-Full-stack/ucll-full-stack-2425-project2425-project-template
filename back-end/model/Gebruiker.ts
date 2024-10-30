export class Gebruiker {
    private id?: number;
    private username: string;
    private password: string;

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

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    equals(other: Gebruiker): boolean {
        return (
            this.id === other.getId() &&
            this.username === other.getUsername() &&
            this.password === other.getPassword()
        );
    }
}