import { Game } from "./game";

export class Achievement {
    private id?: number;
    private name: string;
    private description: string;
    private game: Game;

    constructor(achievement: {
        id?: number;
        name: string;
        description: string;
        game: Game;
    }) {
        this.validate(achievement);

        this.id = achievement.id;
        this.name = achievement.name;
        this.description = achievement.description;
        this.game = achievement.game;
    }

    validate(achievement: { id?: number; name: string; description: string; game: Game; }) {
        throw new Error("Method not implemented.");
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getGame(): Game {
        return this.game;
    }

    equals(achievement: Achievement): boolean {
        return (
            this.id === achievement.getId() &&
            this.name === achievement.getName() &&
            this.description === achievement.getDescription() &&
            this.game.equals(achievement.getGame())
        );
    }
}