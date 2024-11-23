import { Ingredient } from './Ingredient';
import { RecipeIngredient } from './RecipeIngredient';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly recipeIngredients?: RecipeIngredient[];

    constructor(data: {
        id?: number;
        name: string;
        description: string;
        recipeIngredients?: RecipeIngredient[];
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.recipeIngredients = data.recipeIngredients;
    }

    static from(data: {
        id?: number;
        name: string;
        description: string;
        recipeIngredients?: RecipeIngredient[];
    }): Recipe {
        return new Recipe({
            ...data,
        });
    }
}
