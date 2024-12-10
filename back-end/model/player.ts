import { Player as PlayerPrisma } from '@prisma/client';

export class Player {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;

    constructor(player: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }) {
        this.validate(player);
        this.id = player.id;
        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.email = player.email;
        this.phoneNumber = player.phoneNumber;
    }

    validate(player: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }) {
        if (!player.firstName) {
            throw new Error('First name is required.');
        }
        if (!player.lastName) {
            throw new Error('Last name is required.');
        }
        if (!player.email) {
            throw new Error('Email is required.');
        }
        if (!player.phoneNumber) {
            throw new Error('Phone number is required.');
        }
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
        return (
            this.id === player.getId() &&
            this.firstName === player.getFirstName() &&
            this.lastName === player.getLastName() &&
            this.email === player.getEmail() &&
            this.phoneNumber === player.getPhoneNumber()
        );
    }

    static from({id, firstName, lastName, email, phoneNumber, teamId}: PlayerPrisma) {
        return new Player({
            id,
            firstName,
            lastName,
            email,
            phoneNumber
        });
    }
}
