import { Location as locationPrisma } from '@prisma/client';

export class Location {
    private id?: number;
    private street: string;
    private number: number;
    private city: string;
    private country: string;

    constructor(location: {
        id?: number;
        street: string;
        number: number;
        city: string;
        country: string;
    }) {
        this.validate(location);
        this.id = location.id;
        this.street = location.street;
        this.number = location.number;
        this.city = location.city;
        this.country = location.country;
    }

    validate(location: { street: string; number: number; city: string; country: string }) {
        if (!location.street) throw new Error('Street is required.');
        if (!location.number) throw new Error('Number is required.');
        if (!location.city) throw new Error('City is required.');
        if (!location.country) throw new Error('Country is required.');
    }

    getId(): number | undefined {
        return this.id;
    }
    getCountry(): string {
        return this.country;
    }
    getCity(): string {
        return this.city;
    }
    getNumber(): number {
        return this.number;
    }
    getStreet(): string {
        return this.street;
    }

    static from({ id, street, number, city, country }: locationPrisma) {
        return new Location({ id, street, number, city, country });
    }
}
