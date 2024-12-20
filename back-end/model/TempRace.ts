import { Crash } from "./Crash";
import { Race as RacePrisma, 
    Crash as CrashPrisma,
    Participant as ParticipantPrisma,
    Driver as DriverPrisma,
    Racecar as RacecarPrisma } from "@prisma/client";

export class TempRace {
    private id?: number;
    private name: string;
    private type: string;
    private description: string;
    private location: string;
    private date: Date;
    private crashes: Crash[];

    constructor(race: { name: string, type: string, description: string, location: string, date: Date, crashes: Crash[], id?: number }) {
        this.validate(race);

        this.name = race.name;
        this.type = race.type;
        this.description = race.description;
        this.location = race.location;
        this.date = race.date;
        if (race.crashes) this.crashes = race.crashes;
        else this.crashes = [];
        if (race.id) this.id = race.id;
    }

    private validate(race: { name: string, type: string, description: string, location: string, date: Date }): void {
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
        if (!race.date) {
            throw new Error('Date is required');
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

    getDate(): Date {
        return this.date;
    }

    getCrashes(): Crash[] {
        return this.crashes;
    }

    equals(other: TempRace): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.type === other.getType() &&
            this.description === other.getDescription() &&
            this.location === other.getLocation() &&
            this.date === other.getDate() &&
            this.crashes === other.getCrashes()
        );
    }

    static from({
        id,
        name,
        type,
        description,
        location,
        date,
        crashes
    }: RacePrisma & {
        crashes: (CrashPrisma & { participants: (ParticipantPrisma & { driver: DriverPrisma, racecar: RacecarPrisma })[] } )[] 
    }) {
        return new TempRace({
            id,
            name,
            type,
            description,
            location,
            date,
            crashes: crashes.map((crash) => Crash.from(crash))
        });
    }
}