import { User } from './user';

export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private user?: User;

    constructor(profile: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        user?: User;
    }) {
        this.id = profile.id;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
        this.user = profile.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getUser(): User | undefined {
        return this.user;
    }

    setUser(user: User): void {
        this.user = user;
    }
}
