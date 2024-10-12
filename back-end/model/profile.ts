import { User } from './user';

export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private user: User;

    constructor(profile: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        user: User;
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

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getUser(): User {
        return this.user;
    }

    equals(profile: Profile): boolean {
        return (
            this.firstName === profile.getFirstName() &&
            this.lastName === profile.getLastName() &&
            this.email === profile.getEmail() &&
            this.user.equals(profile.getUser())
        );
    }
}
