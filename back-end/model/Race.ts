import { Admin } from './Admin';
import { Gebruiker } from './Gebruiker';
import { Crash } from './Crash';
import { Driver } from './Driver';

export class Race {
    private id?: number;
    private name: string;
    private type: string;
    private description: string;
    private location: string;
    private crashes?: Crash[];
    private drivers: Driver[];
    private admin?: Admin;

    constructor(race: { name: string, type: string, description: string, location: string, drivers: Driver[], crashes?: Crash[], admin?: Admin, id?: number }) {
        this.validate(race);

        this.name = race.name;
        this.type = race.type;
        this.description = race.description;
        this.location = race.location;
        this.drivers = race.drivers;
        if (race.crashes) this.crashes = race.crashes;
        if (race.admin) this.admin = race.admin;
        if (race.id) this.id = race.id;
    }

    private validate(race: { name: string, type: string, description: string, location: string, drivers: Driver[], crashes?: Crash[], admin?: Admin, id?: number }): void {
        if (!race.name) {
            throw new Error('Name is required');
        }
        if (!race.type) {
            throw new Error('Type is required');
        }
        if (!race.description) {
            throw new Error('Description is required');
        }
        if (!race.location) {
            throw new Error('Location is required');
        }
        if (!race.drivers || race.drivers.length === 0) {
            throw new Error('At least one driver is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getDescription(): string {
        return this.description;
    }

    getLocation(): string {
        return this.location;
    }

    getCrashes(): Crash[] | undefined {
        return this.crashes;
    }

    getDrivers(): Driver[] {
        return this.drivers;
    }

    getAdmin(): Admin | undefined {
        return this.admin;
    }

    equals(other: Race): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.type === other.getType() &&
            this.description === other.getDescription() &&
            this.location === other.getLocation() &&
            JSON.stringify(this.crashes) === JSON.stringify(other.getCrashes()) &&
            JSON.stringify(this.drivers) === JSON.stringify(other.getDrivers()) &&
            this.admin === other.getAdmin()
        );
    }
}