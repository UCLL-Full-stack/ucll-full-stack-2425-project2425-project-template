import { User } from './user';
import { 
    User as UserPrisma,
    Player as PlayerPrisma,
} from "@prisma/client"; 

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
        if (!player.name) {
            throw new Error('Name is required.');
        }
        if (!player.statistics) {
            throw new Error('Statistics are required.');
        }
        if (!player.class) {
            throw new Error('Class is required.');
        }
        if (player.currency < 0) {
            throw new Error('Currency cannot be negative.');
        }
        if (!player.user) {
            throw new Error('A correct user is required.');
        }
    }

    static from({
        id,
        name,
        statistics,
        class: String,
        currency,
        user,
    }: PlayerPrisma & {
        user: UserPrisma;
    }) {
        return new Player({
            id,
            name,
            statistics,
            class: String,
            currency,
            user: User.from(user),
        })
    }
}
