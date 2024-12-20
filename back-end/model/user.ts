import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private createdCocktails: number[];

    constructor(user: {
        id?: number,
        name: string,
        email: string,
        password: string,
        role: string,
        createdCocktails?: number[],
    }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.createdCocktails = user.createdCocktails || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): string {
        return this.role;
    }

    getCreatedCocktails(): number[] {
        return this.createdCocktails;
    }

    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    addCreatedCocktail(cocktailId: number): void {
        if (!this.createdCocktails.includes(cocktailId)) {
            this.createdCocktails.push(cocktailId);
        }
    }

    removeCreatedCocktail(cocktailId: number): void {
        const index = this.createdCocktails.indexOf(cocktailId);
        if (index !== -1) {
            this.createdCocktails.splice(index, 1);
        }
    }

    equals(otherUser: User): boolean {
        return (
            this.id === otherUser.id &&
            this.name === otherUser.name &&
            this.email === otherUser.email &&
            this.password === otherUser.password &&
            this.role === otherUser.role &&
            JSON.stringify(this.createdCocktails) === JSON.stringify(otherUser.createdCocktails)
        );
    }

    static from({ id, name, email, password, role, createdCocktails }: UserPrisma & { createdCocktails?: number[] }) {
        return new User({
            id,
            name,
            email,
            password,
            role,
            createdCocktails: createdCocktails || [],
        });
    }
}
