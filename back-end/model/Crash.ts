import { Crash as CrashPrisma } from '@prisma/client';

export class Crash {
    readonly id?: number;
    readonly type: string;
    readonly description: string;
    readonly casualties: number;
    readonly deaths: number;

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

    equals(other: Crash): boolean {
        return (
            this.id === other.id &&
            this.type === other.type &&
            this.description === other.description &&
            this.casualties === other.casualties &&
            this.deaths === other.deaths
        );
    }

    static from ({
        id,
        type,
        description,
        casualties,
        deaths,
    }: CrashPrisma) {
        return new Crash({
            id,
            type,
            description,
            casualties,
            deaths,
        });
    }
}