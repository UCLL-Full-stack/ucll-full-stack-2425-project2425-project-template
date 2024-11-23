import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

export class RecipeIngredient {
    readonly id?: number;
    readonly amount: number;
    readonly measurementType: string;
    readonly recipe: Recipe;
    readonly recipeId?: number;
    readonly ingredient: Ingredient;
    readonly ingredientId?: number;

    constructor(data: {
        id?: number;
        amount: number;
        measurementType: string;
        recipe: Recipe;
        recipeId?: number;
        ingredient: Ingredient;
        ingredientId?: number;
    }) {
        this.id = data.id;
        this.amount = data.amount;
        this.measurementType = data.measurementType;
        this.recipe = data.recipe;
        this.recipeId = data.recipeId;
        this.ingredient = data.ingredient;
        this.ingredientId = data.ingredientId;
    }

    static from(data: {
        id?: number;
        amount: number;
        measurementType: string;
        recipe: Recipe;
        recipeId?: number;
        ingredient: Ingredient;
        ingredientId?: number;
    }): RecipeIngredient {
        return new RecipeIngredient(data);
    }
}
