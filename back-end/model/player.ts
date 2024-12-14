import { Player as PlayerPrisma, Stats as StatsPrisma } from '@prisma/client';
import { Stats } from './stats';

export class Player {
    readonly id: number;
    readonly name: string;
    readonly position: string;
    readonly number: number;
    readonly birthdate: Date;
    readonly stat?: Stats;

    constructor(player: {
        id: number,
        name: string,
        position: string,
        number: number,
        birthdate: Date,
        stat?: Stats
    }) { 
        this.id = player.id;
        this.name = player.name;
        this.position = player.position;
        this.birthdate = player.birthdate;
        this.number = player.number;
        this.stat = player.stat;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getNumber(): number {
        return this.number;
    }

    getStat(): Stats | undefined {
        return this.stat;
    }

    getPosition(): string { 
        return this.position;
    }

    getBirthdate(): Date {
        return this.birthdate;
    }

    equals(player: Player): boolean {
        return (
            this.id === player.id &&
            this.name === player.name &&
            this.position === player.position &&
            this.birthdate.getTime() === player.birthdate.getTime()
        );
    }

    static from({
        id,
        name,
        position,
        number,
        birthdate,
        stat
    }: PlayerPrisma & { stat?: StatsPrisma }): Player {
        return new Player({
            id,
            name,
            position,
            number,
            birthdate,
            stat: stat ? Stats.from(stat) : undefined
        });
    }
}
