export class Driver {
    private id?: number;
    private name: string;
    private team: string;
    private description: string;
    private age: number;

    constructor(name: string, team: string, description: string, age: number, id?: number) {
        this.name = name;
        this.team = team;
        this.description = description;
        this.age = age;
        if (id) this.id = id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getTeam(): string {
        return this.team;
    }

    getDescription(): string {
        return this.description;
    }

    getAge(): number {
        return this.age;
    }

    equals(other: Driver): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.team === other.getTeam() &&
            this.description === other.getDescription() &&
            this.age === other.getAge()
        );
    }
}