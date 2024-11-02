import { User } from './user';

export class Profile {

    private id?: number;
    private email: string;
    private firstName: string;
    private lastName: string;
    private userId: number;

    constructor(profile: { id?: number; email: string; firstName: string; lastName: string; user: User }) {
        this.id = profile.id;
        this.userId = profile.user.getId()!;
        this.email = profile.email;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getEmail(): string {
        return this.email;
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
    }

    equals(profile: Profile): boolean {
        return (
            this.id === profile.getId() &&
            this.email === profile.getEmail() &&
            this.firstName === profile.getFirstName() &&
            this.lastName === profile.getLastName() &&
            this.userId === profile.getUserId()
        );
    }

}