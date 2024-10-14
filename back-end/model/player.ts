export class Player {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;

    constructor(player: { id?: number, firstName: string, lastName: string, email: string, phoneNumber: string }) {
        this.id = player.id;
        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.email = player.email;
        this.phoneNumber = player.phoneNumber;
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

    equals(player: Player): boolean {
        return (this.id === player.getId() &&
            this.firstName === player.getFirstName() &&
            this.lastName === player.getLastName() &&
            this.email === player.getEmail() &&
            this.phoneNumber === player.getPhoneNumber()
        );
    }   
}