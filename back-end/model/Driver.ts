import { Racecar } from './Racecar';
import { Crash } from './Crash';

export class Driver {
    private id?: number;
    private name: string;
    private team: string;
    private description: string;
    private age: number;
    private racecar: Racecar;
    private crash: Crash;

    constructor(driver: { name: string, team: string, description: string, age: number, racecar: Racecar, crash: Crash, id?: number }) {
        this.validate(driver);

        this.name = driver.name;
        this.team = driver.team;
        this.description = driver.description;
        this.age = driver.age;
        this.racecar = driver.racecar;
        this.crash = driver.crash;
        if (driver.id) this.id = driver.id;
    }

    private validate(driver: { name: string, team: string, description: string, age: number, racecar: Racecar, crash: Crash, id?: number }): void {
        if (!driver.name) {
            throw new Error('Name is required');
        }
        if (!driver.team) {
            throw new Error('Team is required');
        }
        if (!driver.description) {
            throw new Error('Description is required');
        }
        if (driver.age === undefined) {
            throw new Error('Age is required');
        }
        if (!driver.racecar) {
            throw new Error('Racecar is required');
        }
        if (!driver.crash) {
            throw new Error('Crash is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getTeam(): string {
        return this.team;
    }

    getDescription(): string {
        return this.description;
    }

    getAge(): number {
        return this.age;
    }

    getRacecar(): Racecar {
        return this.racecar;
    }

    getCrash(): Crash {
        return this.crash;
    }

    equals(other: Driver): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.team === other.getTeam() &&
            this.description === other.getDescription() &&
            this.age === other.getAge() &&
            this.racecar === other.getRacecar() &&
            this.crash === other.getCrash()
        );
    }
}