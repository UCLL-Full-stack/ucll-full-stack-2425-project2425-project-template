export class User {
    private readonly id?: number | undefined;
    private readonly email: string;
    private readonly name: string;

    constructor(user: { id?: number, email: string, name: string }) {
        this.id == user.id;
        this.email = user.email;
        this.name = user.name;
    }

    getId(): number | undefined {
        return this.id
    }

    getEmail(): string {
        return this.email
    }

    getName(): string {
        return this.name
    }
}

