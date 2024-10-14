import { Team } from "./team";

export class Game {
    private id?: number;
    private date: Date;
    private result?: string;
    private teams: Team[];

    constructor(game: {id?: number; date: Date; result?: string, teams: Team[]}) {
        this.id = game.id;
        this.date = game.date;
        this.result = game.result;
        this.teams = game.teams;
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
}