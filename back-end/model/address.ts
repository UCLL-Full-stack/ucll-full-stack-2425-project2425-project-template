import { User } from "./user";

export class Address {
    private id?: number;
    private city: string;
    private country: string;
    private postCode: string;
    private street: string;
    private houseNumber: number;
    private user: User;

    constructor(address: {
        id?: number;
        city: string;
        country: string;
        postCode: string;
        street: string;
        houseNumber: number;
        user: User;
    }) {
        this.validate(address);

        this.id = address.id;
        this.city = address.city;
        this.country = address.country;
        this.postCode = address.postCode;
        this.street = address.street;
        this.houseNumber = address.houseNumber;
        this.user = address.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getCity(): string {
        return this.city;
    }

    getCountry(): string {
        return this.country;
    }

    getPostCode(): string {
        return this.postCode;
    }

    getStreet(): string {
        return this.street;
    }

    getHouseNumber(): number {
        return this.houseNumber;
    }

    getUser(): User {
        return this.user;
    }

    validate(address: {
        city: string;
        country: string;
        postCode: string;
        street: string;
        houseNumber: number;
        user: User;
    }) {
        if (!address.city?.trim()) {
            throw new Error('City is required');
        }
        if (!address.country?.trim()) {
            throw new Error('Country is required');
        }
        if (!address.postCode?.trim()) {
            throw new Error('Post code is required');
        }
        if (!address.street?.trim()) {
            throw new Error('Street is required');
        }
        if (!address.houseNumber || address.houseNumber <= 0) {
            throw new Error('Valid house number is required');
        }
        if (!address.user) {
            throw new Error('User is required');
        }
    }

    equals(address: Address): boolean {
        return (
            this.city === address.getCity() &&
            this.country === address.getCountry() &&
            this.postCode === address.getPostCode() &&
            this.street === address.getStreet() &&
            this.houseNumber === address.getHouseNumber() &&
            this.user === address.getUser()
        );
    }
}
