import { Driver as DriverPrisma } from '@prisma/client';

export class Driver {
    private id?: number;
    private name: string;
    private surname: string;
    private birthdate: Date;
    private team: string;
    private country: string;
    private description: string;

    constructor(driver: { name: string, surname: string, birthdate: Date, team: string, country: string, description: string, id?: number }) {
        this.validate(driver);

        this.name = driver.name;
        this.surname = driver.surname;
        this.birthdate = driver.birthdate;
        this.team = driver.team;
        this.country = driver.country;
        this.description = driver.description;
        if (driver.id) this.id = driver.id;
    }

    private validate(driver: { name: string, surname: string, birthdate: Date, team: string, country: string, description: string, id?: number }): void {
        if (!driver.name) {
            throw new Error('Name is required');
        }
        if (!driver.surname) {
            throw new Error('Surname is required');
        }
        if (!driver.birthdate) {
            throw new Error('Birthdate is required');
        }
        if (!driver.team) {
            throw new Error('Team is required');
        }
        if (!driver.country) {
            throw new Error('Country is required');
        }
        if (!driver.description) {
            throw new Error('Description is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getSurname(): string {
        return this.surname;
    }

    getBirthdate(): Date {
        return this.birthdate;
    }

    getTeam(): string {
        return this.team;
    }

    getCountry(): string {
        return this.country;
    }

    getDescription(): string {
        return this.description;
    }

    equals(other: Driver): boolean {
        return (
            this.id === other.id &&
            this.name === other.name &&
            this.surname === other.surname &&
            this.birthdate === other.birthdate &&
            this.team === other.team &&
            this.country === other.country &&
            this.description === other.description
        );
    }

    static from({
        id,
        name,
        surname,
        birthdate,
        team,
        country,
        description
    }: DriverPrisma) {
        return new Driver({
            id,
            name,
            surname,
            birthdate,
            team,
            country,
            description
        });
    }
}