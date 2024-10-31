import { Achievement } from "./achievement";

export class Game {
    private id?: number;
    private name: string;
    private genre: string;
    private description: string;
    private releaseDate: Date;

    constructor(game: {
        id?: number;
        name: string;
        genre: string;
        description: string;
        releaseDate: Date;
    }) {
        this.validate(game);

        this.id = game.id;
        this.name = game.name;
        this.genre = game.genre;
        this.description = game.description;
        this.releaseDate = game.releaseDate;
    }

    validate(game: { id?: number; name: string; genre: string; description: string; releaseDate: Date; }) {
        throw new Error("Method not implemented.");
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getGenre(): string {
        return this.genre;
    }

    getDescription(): string {
        return this.description;
    }

    getReleaseDate(): Date {
        return this.releaseDate;
    }

    equals(game: Game): boolean {
        return (
            this.id === game.getId() &&
            this.name === game.getName() &&
            this.genre === game.getGenre() &&
            this.description === game.getDescription() &&
            this.releaseDate === game.getReleaseDate()
        );
    }
}