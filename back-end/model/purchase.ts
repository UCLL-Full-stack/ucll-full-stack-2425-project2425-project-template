import { User } from './User';
import { Game } from './Game';

export class Purchase {
    private id: number;
    private date: number;
    private cost: number;
    private user: User;
    private game: Game;

    constructor(purchase: {
        id: number;
        date: number;
        cost: number;
        user: User;
        game: Game;
    }) {
        this.validate(purchase);

        this.id = purchase.id;
        this.date = purchase.date;
        this.cost = purchase.cost;
        this.user = purchase.user;
        this.game = purchase.game;
    }

    getId(): number {
        return this.id;
    }

    getDate(): number {
        return this.date;
    }

    getCost(): number {
        return this.cost;
    }

    getUser(): User {
        return this.user;
    }

    getGame(): Game {
        return this.game;
    }

    validate(purchase: {
        id: number;
        date: number;
        cost: number;
        user: User;
        game: Game;
    }) {
        if (!Number.isInteger(purchase.id)) {
            throw new Error('Purchase ID is required and must be an integer');
        }
        if (purchase.date <= 0) {
            throw new Error('Date is required and must be a valid timestamp');
        }
        if (purchase.cost < 0) {
            throw new Error('Cost is required and must be a non-negative number');
        }
        if (!purchase.user) {
            throw new Error('User is required');
        }
        if (!purchase.game) {
            throw new Error('Game is required');
        }
    }

    equals(purchase: Purchase): boolean {
        return (
            this.id === purchase.getId() &&
            this.date === purchase.getDate() &&
            this.cost === purchase.getCost() &&
            this.user === purchase.getUser() &&
            this.game === purchase.getGame()
        );
    }
}
