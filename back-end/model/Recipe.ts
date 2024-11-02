import { Ingredient } from './Ingredient';
import { User } from './User';
import { Review } from './Review';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    // readonly steps: string[]; would make it easier to style and make it more fun to write the recipe by adding steps with an add step button etc
    readonly ingredients: Ingredient[];
    readonly creator: User;
    readonly reviews: Review[];

    constructor(name: string, description: string, ingredients: Ingredient[], creator: User, reviews: Review[]) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.creator = creator;
        this.reviews = reviews;
    }

    equals(recipe: Recipe): boolean {
        return this.name === recipe.name && this.description === recipe.description;
    }
}

export default { Recipe };