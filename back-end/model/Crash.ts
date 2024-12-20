import { Crash as CrashPrisma, Participant as ParticipantPrisma, Racecar as RacecarPrisma, Driver as DriverPrisma } from '@prisma/client';
import { Participant } from './Participant';

export class Crash {
    private id?: number;
    private type: string;
    private description: string;
    private casualties: number;
    private deaths: number;
    private participants: Participant[];

    constructor(crash: { type: string, description: string, casualties: number, deaths: number, participants?: Participant[], id?: number }) {
        this.validate(crash);
        this.type = crash.type;
        this.description = crash.description;
        this.casualties = crash.casualties;
        this.deaths = crash.deaths;
        if (crash.participants) this.participants = crash.participants;
        else this.participants = [];
        if (crash.id) this.id = crash.id;
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

    getParticipants(): Participant[] | undefined {
        return this.participants;
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

    addParticipant(participant: Participant): void {
        this.participants.push(participant);
    }

    equals(other: Crash): boolean {
        return (
            this.id === other.id &&
            this.type === other.type &&
            this.description === other.description &&
            this.casualties === other.casualties &&
            this.deaths === other.deaths &&
            this.participants === other.participants
        );
    }

    static from ({
        id,
        type,
        description,
        casualties,
        deaths,
        participants,
    }: CrashPrisma & { 
        participants: (ParticipantPrisma & { driver: DriverPrisma, racecar: RacecarPrisma })[];
    }) {
        return new Crash({
            id,
            type,
            description,
            casualties,
            deaths,
            participants: participants.map((participant) => Participant.from(participant)),
        });
    }
}