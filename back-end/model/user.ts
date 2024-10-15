export class User {
    private id?: number;
    private username: string;
    private hashedPassword: string;

    constructor(user: {
        id?: number;
        username: string;
        hashedPassword: string;
    }) {
        this.id = user.id;
        this.username = user.username;
        this.hashedPassword = user.hashedPassword;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getHashedPassword(): string {
        return this.hashedPassword;
    }

    // setters
    setUsername(username: string): void {
        this.username = username;
    }

    setHashedPassword(hashedPassword: string): void {
        this.hashedPassword = hashedPassword;
    }

    // methods
    equals(otherUser: User): boolean {
        return (
            this.username === otherUser.getUsername() &&
            this.hashedPassword === otherUser.getHashedPassword()
        );
    }
}
