import { User } from './user';

export class Player {
    private id?: number;
    private name: string;
    private statistics: string; // still needs to be expended upon
    private class: string; // will later be a Class type
    private currency: number;
    private user: User;

    constructor(player: {
        id?: number;
        name: string;
        statistics: string;
        class: string;
        currency: number;
        user: User;
    }) {
        this.validate(player);

        this.id = player.id;
        this.name = player.name;
        this.statistics = player.statistics;
        this.class = player.class;
        this.currency = player.currency;
        this.user = player.user;
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

    getUser(): User {
        return this.user;
    }

    validate(player: {
        name: string;
        statistics: string;
        class: string;
        currency: number;
        user: User;
    }) {
        // will be implemented later.
    }
}
