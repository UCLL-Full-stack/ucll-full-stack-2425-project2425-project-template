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
        this.recipe = recipeIngredient.recipe;
        this.ingredient = recipeIngredient.ingredient;
        this.unit = recipeIngredient.unit;
        this.quantity = recipeIngredient.quantity;
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
