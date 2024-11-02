import { User } from './User';
import { Recipe } from './Recipe';

export class Review {
    readonly id?: number;
    readonly writer: User;
    readonly text: string;
    readonly score: number;
    readonly recipe: Recipe;

    constructor(writer: User, text: string, score: number, recipe: Recipe) {
        this.writer = writer;
        this.text = text;
        this.score = score;
        this.recipe = recipe;
    }

    equals(review: Review): boolean {
        return this.text === review.text && this.score === review.score && this.writer.equals(review.writer) && this.recipe.equals(review.recipe);
    }
}

export default { Review };