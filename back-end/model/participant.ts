import { Driver } from './driver';
import { Racecar } from './racecar';
import { Participant as ParticipantPrisma, Driver as DriverPrisma, Racecar as RacecarPrisma } from '@prisma/client';

export class Participant {
    private id?: number;
    private driver: Driver;
    private racecar: Racecar;

    constructor(participant: { driver: Driver, racecar: Racecar, id?: number }) {
        this.validate(participant);

        this.driver = participant.driver;
        this.racecar = participant.racecar;
        if (participant.id) this.id = participant.id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDriver(): Driver {
        return this.driver;
    }

    getRacecar(): Racecar {
        return this.racecar;
    }

    private validate(participant: { driver: Driver, racecar: Racecar, id?: number }): void {
        if (!participant.driver) {
            throw new Error('Driver is required');
        }
        if (!participant.racecar) {
            throw new Error('Racecar is required');
        }
    }

    equals(other: Participant): boolean {
        return (
            this.id === other.id &&
            this.driver.equals(other.driver) &&
            this.racecar.equals(other.racecar)
        );
    }

    static from ({
        id,
        driver,
        racecar
    }: ParticipantPrisma & { driver: DriverPrisma, racecar: RacecarPrisma }) {
        return new Participant({
            id,
            driver: new Driver(driver),
            racecar: new Racecar(racecar)
        });
    }
}