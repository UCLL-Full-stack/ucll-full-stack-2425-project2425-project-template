import { Driver } from './driver';
import { Race } from './race';

export class Crash {
    private id?: number;
    private type: string;
    private description: string;
    private casualties: number;
    private deaths: number;

    constructor(crash: { type: string, description: string, casualties: number, deaths: number, id?: number }) {
        this.validate(crash);

        this.type = crash.type;
        this.description = crash.description;
        this.casualties = crash.casualties;
        this.deaths = crash.deaths;
        if (crash.id) this.id = crash.id;
    }

    private validate(crash: { type: string, description: string, casualties: number, deaths: number, id?: number }): void {
        if (!crash.type) {
            throw new Error('Type is required');
        }
        if (!crash.description) {
            throw new Error('Description is required');
        }
        if (crash.casualties === undefined) {
            throw new Error('Casualties are required');
        }
        if (crash.deaths === undefined) {
            throw new Error('Deaths are required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getType(): string {
        return this.type;
    }

    getDescription(): string {
        return this.description;
    }

    getCasualties(): number {
        return this.casualties;
    }

    getDeaths(): number {
        return this.deaths;
    }

    equals(other: Crash): boolean {
        return (
            this.id === other.getId() &&
            this.type === other.getType() &&
            this.description === other.getDescription() &&
            this.casualties === other.getCasualties() &&
            this.deaths === other.getDeaths()
        );
    }
}