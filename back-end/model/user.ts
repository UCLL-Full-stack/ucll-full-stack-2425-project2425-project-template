import {User as UserPrisma} from '@prisma/client'

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
   
    constructor(user: { id?: number, name: string, email: string, password: string , role: string}) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
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
      
    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    equals(otherUser: User): boolean {
        return (
            this.id === otherUser.id &&
            this.name === otherUser.name &&
            this.email === otherUser.email &&
            this.password === otherUser.password &&
            this.role === otherUser.role
        );
    }

    static from ({ id, name, email, password, role}: UserPrisma ) {
        return new User({
            id,
            name,
            email,
            password,
            role,
        })
    }
}