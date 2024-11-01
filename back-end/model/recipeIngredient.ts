import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

export class RecipeIngredient {
    private recipe: Recipe;
    private ingredient: Ingredient;
    private unit: string;
    private quantity: number;

    constructor(recipeIngredient: {
        recipe: Recipe;
        ingredient: Ingredient;
        unit: string;
        quantity: number;
    }) {
        this.validate(recipeIngredient);
        this.recipe = recipeIngredient.recipe;
        this.ingredient = recipeIngredient.ingredient;
        this.unit = recipeIngredient.unit;
        this.quantity = recipeIngredient.quantity;
    }

    validate(recipeIngredient: {
        recipe: Recipe;
        ingredient: Ingredient;
        unit: string;
        quantity: number;
    }): void {
        if (!recipeIngredient.recipe) {
            throw new Error('Recipe is required');
        }
        if (!recipeIngredient.ingredient) {
            throw new Error('Ingredient is required');
        }
        if (!recipeIngredient.unit || recipeIngredient.unit.trim().length === 0) {
            throw new Error('Unit is required and cannot be empty');
        }
        if (recipeIngredient.quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
    }

    getRecipe(): Recipe {
        return this.recipe;
    }

    getIngredient(): Ingredient {
        return this.ingredient;
    }

    getUnit(): string {
        return this.unit;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setRecipe(recipe: Recipe) {
        this.recipe = recipe;
    }

    equals(recipeIngredient: RecipeIngredient): boolean {
        return (
            this.recipe === recipeIngredient.getRecipe() &&
            this.ingredient === recipeIngredient.getIngredient() &&
            this.unit === recipeIngredient.getUnit() &&
            this.quantity === recipeIngredient.getQuantity()
        );
    }
}
