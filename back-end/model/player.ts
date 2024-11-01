export class Player {
    private id?: number;
    private name: string;
    private statistics: string; // still needs to be expended upon
    private class: string; // will later be a Class type
    private currency: number;

    constructor(player: {
        id?: number;
        name: string;
        statistics: string;
        class: string;
        currency: number;
    }) {
        this.validate(player);

        this.id = player.id;
        this.name = player.name;
        this.statistics = player.statistics;
        this.class = player.class;
        this.currency = player.currency;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getStatistics(): string {
        return this.statistics;
    }

    getClass(): string {
        return this.class;
    }

    getCurrency(): number {
        return this.currency;
    }

    validate(player: { name: string; statistics: string; class: string; currency: number }) {
        // will be implemented later.
    }
}
