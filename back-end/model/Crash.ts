export class Crash {
    private id?: number;
    private type: string;
    private description: string;
    private casualties: number;
    private deaths: number;

    constructor(type: string, description: string, casualties: number, deaths: number, id?: number) {
        this.type = type;
        this.description = description;
        this.casualties = casualties;
        this.deaths = deaths;
        if (id) this.id = id;
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

    equals(other: Crash): boolean {
        return (
            this.id === other.getId() &&
            this.type === other.getType() &&
            this.description === other.getDescription() &&
            this.casualties === other.getCasualties() &&
            this.deaths === other.getDeaths()
        );
    }
}