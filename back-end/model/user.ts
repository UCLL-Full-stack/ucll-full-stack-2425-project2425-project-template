export class User {
    private id?: number;
    private name: string;
    private password: string;
    private email: string;
    private role: string;

    constructor(user: {
        id?: number;
        name: string;
        password: string;
        email: string;
        role: string;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getPassword(): string {
        return this.password;
    }
    getEmail(): string {
        return this.email;
    }
    getRole(): string {
        return this.role;
    }
}