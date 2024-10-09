export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;

    constructor(profile: { id?: number; firstName: string; lastName: string; email: string }) {
        this.id = profile.id;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
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

    equals(profile: Profile): boolean {
        return (
            this.firstName === profile.getFirstName() &&
            this.lastName === profile.getLastName() &&
            this.email === profile.getEmail()
        );
    }
}
