export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;

    constructor(user:{id?: number, username: string, email: string, password: string}) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }

    public getId(): number | undefined {
        return this.id;
    }
    
    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        )
    }
}