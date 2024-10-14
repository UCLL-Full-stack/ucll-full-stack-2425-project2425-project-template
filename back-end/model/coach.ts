export class Coach {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;

    constructor(coach: {id?: number; firstName: string; lastName: string; email: string; phoneNumber: string}) {
        this.id = coach.id;
        this.firstName = coach.firstName;
        this.lastName = coach.lastName;
        this.email = coach.email;
        this.phoneNumber = coach.phoneNumber;
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

    getPhoneNumber(): string {
        return this.phoneNumber;
    }
}