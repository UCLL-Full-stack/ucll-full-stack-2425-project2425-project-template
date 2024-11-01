import { Category } from './category';
import { Game } from './game';
import { User } from './user';

export class Speedrun {
    private id?: number;
    // TODO: How do we want to store time? in milliseconds (number) or something else
    private time: number;
    private submitDate: Date;
    private videoLink: string;
    private category: Category;
    private speedrunner: User;
    private isValidated: boolean;
    private validator?: User;
    private game: Game;

    constructor(speedrun: {
        id?: number;
        time: number;
        submitDate: Date;
        videoLink: string;
        category: Category;
        isValidated: boolean;
        speedrunner: User;
        validator?: User;
        game: Game;
    }) {
        this.validate(speedrun);

        this.id = speedrun.id;
        this.time = speedrun.time;
        this.submitDate = speedrun.submitDate;
        this.videoLink = speedrun.videoLink;
        this.category = speedrun.category;
        this.speedrunner = speedrun.speedrunner;
        this.isValidated = speedrun.isValidated;
        this.validator = speedrun.validator;
        this.game = speedrun.game;
    }

    validate(speedrun: {
        id?: number;
        time: number;
        submitDate: Date;
        videoLink: string;
        isValidated: boolean;
        speedrunner: User;
        validator?: User;
        game: Game;
        category: Category;
    }) {
        throw new Error('Method not implemented.');
    }

    getId(): number | undefined {
        return this.id;
    }

    getTime(): number {
        return this.time;
    }

    getSubmitDate(): Date {
        return this.submitDate;
    }

    getVideoLink(): string {
        return this.videoLink;
    }

    getSpeedrunner(): User {
        return this.speedrunner;
    }

    getIsValidated(): boolean {
        return this.isValidated;
    }

    getValidator(): User | undefined {
        return this.validator;
    }

    getGame(): Game {
        return this.game;
    }

    getCategory(): Category {
        return this.category;
    }

    equals(speedrun: Speedrun): boolean {
        return (
            this.id === speedrun.getId() &&
            this.time === speedrun.getTime() &&
            this.submitDate.getTime() === speedrun.getSubmitDate().getTime() &&
            this.videoLink === speedrun.getVideoLink() &&
            this.speedrunner.equals(speedrun.getSpeedrunner()) &&
            this.isValidated === speedrun.getIsValidated() &&
            ((this.validator === undefined && speedrun.getValidator() === undefined) ||
                this.validator!.equals(speedrun.getValidator()!)) &&
            this.game.equals(speedrun.getGame()) &&
            this.category.equals(speedrun.getCategory())
        );
    }
}
