import { Team } from './team';
import { 
    Team as TeamPrisma,
    Game as GamePrisma
 } from '@prisma/client';

export class Game {
    private id?: number;
    private date: Date;
    private result?: string;
    private teams: Team[];

    constructor(game: { id?: number; date: Date; result?: string; teams: Team[] }) {
        this.validate(game);
        this.id = game.id;
        this.date = game.date;
        this.result = game.result;
        this.teams = game.teams;
    }

    validate(game: { id?: number; date: Date; result?: string; teams: Team[] }) {
        if (!game.date) {
            throw new Error('Game date is required.');
        }
        if (!game.teams) {
            throw new Error('Teams are required.');
        }
        if (game.teams.length != 2) {
            throw new Error('Exactly two teams are required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getResult(): string | undefined {
        return this.result;
    }

    getTeams(): Team[] {
        return this.teams;
    }

    setResult(result: string) {
        this.result = result;
    }

    static from({id, result, date}: GamePrisma & {teams: TeamPrisma[]}) {
        return new Game({
            id,
            result: result ?? undefined,
            date,
            teams: []
        });
    }
}
