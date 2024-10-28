export class Racecar {
    private id?: number;
    private car_name: string;
    private type: string;
    private description: string;
    private hp: number;

    constructor(car_name: string, type: string, description: string, hp: number, id?: number) {
        this.car_name = car_name;
        this.type = type;
        this.description = description;
        this.hp = hp;
        if (id) this.id = id;
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