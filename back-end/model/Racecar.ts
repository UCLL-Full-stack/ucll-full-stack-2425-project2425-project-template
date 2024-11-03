export class Racecar {
    private id?: number;
    private car_name: string;
    private type: string;
    private description: string;
    private hp: number;

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

    getId(): number | undefined {
        return this.id;
    }

    getCarName(): string {
        return this.car_name;
    }

    getType(): string {
        return this.type;
    }

    getDescription(): string {
        return this.description;
    }

    getHp(): number {
        return this.hp;
    }

    equals(other: Racecar): boolean {
        return (
            this.id === other.getId() &&
            this.car_name === other.getCarName() &&
            this.type === other.getType() &&
            this.description === other.getDescription() &&
            this.hp === other.getHp()
        );
    }
}