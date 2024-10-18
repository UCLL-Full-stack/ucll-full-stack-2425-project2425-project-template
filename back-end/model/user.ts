export abstract class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;

    constructor(user: {id: number, name: string,email: string, password: string}){
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    getId(): number {
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getEmail(): string{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }
}