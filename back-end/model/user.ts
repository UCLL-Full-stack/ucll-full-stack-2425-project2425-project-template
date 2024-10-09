export class User {
    private id?: number;
    private username: string;
    private password: string;

    constructor(user: { id?: number; username: string; password: string }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
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

    equals(user: User): boolean {
        return this.username === user.getUsername() && this.password === user.getPassword();
    }
}
