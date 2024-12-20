import { Racecar as RacecarPrisma } from '@prisma/client';

export class Racecar {
    private id?: number;
    private name: string;
    private type: string;
    private brand: string;
    private hp: number;

    constructor(racecar: { name: string, type: string, brand: string, hp: number, id?: number }) {
        this.validate(racecar);
        this.name = racecar.name;
        this.type = racecar.type;
        this.brand = racecar.brand;
        this.hp = racecar.hp;
        if (racecar.id) this.id = racecar.id;
    }

    private validate(racecar: { name: string, type: string, brand: string, hp: number, id?: number }): void {
        if (!racecar.name) {
            throw new Error('Car name is required');
        }
        if (!racecar.type) {
            throw new Error('Type is required');
        }
        if (!racecar.brand) {
            throw new Error('Brand is required');
        }
        if (racecar.hp === undefined) {
            throw new Error('Horsepower is required');
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

    getBrand(): string {
        return this.brand;
    }

    getHp(): number {
        return this.hp;
    }

    equals(other: Racecar): boolean {
        return (
            this.id === other.id &&
            this.name === other.name &&
            this.type === other.type &&
            this.brand === other.brand &&
            this.hp === other.hp
        );
    }

    static from ({
        id,
        name,
        type,
        brand,
        hp,
    }: RacecarPrisma) {
        return new Racecar({
            id,
            name,
            type,
            brand,
            hp,
        });
    }
}