export class Profile {
    private id?: number;
    private email: string;
    private bio: string;
    private firstName: string;
    private lastName: string;

    constructor(user: {
        id?: number;
        email: string;
        bio: string;
        firstName: string;
        lastName: string;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.bio = user.bio;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getBio(): string {
        return this.bio;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    // setters
    setEmail(email: string): void {
        this.email = email;
    }

    setBio(bio: string): void {
        this.bio = bio;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    // methods
    equals(otherProfile: Profile): boolean {
        return (
            this.email === otherProfile.getEmail() &&
            this.bio === otherProfile.getBio() &&
            this.firstName === otherProfile.getFirstName() &&
            this.lastName === otherProfile.getLastName()
        );
    }
}
