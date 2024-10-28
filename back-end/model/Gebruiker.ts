export class Gebruiker {
    private id?: number;
    private username: string;
    private password: string;

    constructor(username: string, password: string, id?: number) {
        this.username = username;
        this.password = password;
        if (id) this.id = id;
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