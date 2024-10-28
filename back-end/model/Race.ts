export class Race {
    private id?: number;
    private name: string;
    private type: string;
    private description: string;
    private location: string;

    constructor(name: string, type: string, description: string, location: string, id?: number) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.location = location;
        if (id) this.id = id;
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

    equals(other: Race): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.type === other.getType() &&
            this.description === other.getDescription() &&
            this.location === other.getLocation()
        );
    }
}