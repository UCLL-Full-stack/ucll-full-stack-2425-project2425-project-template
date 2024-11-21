import { Racecar as RacecarPrisma } from '@prisma/client';

export class Racecar {
    readonly id?: number;
    readonly car_name: string;
    readonly type: string;
    readonly description: string;
    readonly hp: number;

    constructor(racecar: { car_name: string, type: string, description: string, hp: number, id?: number }) {
        this.validate(racecar);
        this.car_name = racecar.car_name;
        this.type = racecar.type;
        this.description = racecar.description;
        this.hp = racecar.hp;
        if (racecar.id) this.id = racecar.id;
    }

    private validate(racecar: { car_name: string, type: string, description: string, hp: number, id?: number }): void {
        if (!racecar.car_name) {
            throw new Error('Car name is required');
        }
        if (!racecar.type) {
            throw new Error('Type is required');
        }
        if (!racecar.description) {
            throw new Error('Description is required');
        }
        if (racecar.hp === undefined) {
            throw new Error('Horsepower is required');
        }
    }

    equals(other: Racecar): boolean {
        return (
            this.id === other.id &&
            this.car_name === other.car_name &&
            this.type === other.type &&
            this.description === other.description &&
            this.hp === other.hp
        );
    }

    static from ({
        id,
        car_name,
        type,
        description,
        hp,
    }: RacecarPrisma) {
        return new Racecar({
            id,
            car_name,
            type,
            description,
            hp,
        });
    }
}