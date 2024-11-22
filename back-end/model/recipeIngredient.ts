import {
    Recipe as RecipePrisma,
    Ingredient as IngredientPrisma,
    RecipeIngredient as RecipeIngredientPrisma,
} from '@prisma/client';

export class RecipeIngredient {
    private recipeId: number;
    private ingredientId: number;
    private unit: string;
    private quantity: number;

    constructor(recipeIngredient: {
        recipeId: number;
        ingredientId: number;
        unit: string;
        quantity: number;
    }) {
        this.recipeId = recipeIngredient.recipeId;
        this.ingredientId = recipeIngredient.ingredientId;
        this.unit = recipeIngredient.unit;
        this.quantity = recipeIngredient.quantity;
    }

    static from({
        recipeId,
        ingredientId,
        unit,
        quantity,
    }: RecipeIngredientPrisma): RecipeIngredient {
        return new RecipeIngredient({
            recipeId,
            ingredientId,
            unit,
            quantity,
        });
    }

    getRecipeId(): number {
        return this.recipeId;
    }

    getIngredientId(): number {
        return this.ingredientId;
    }

    getUnit(): string {
        return this.unit;
    }

    getQuantity(): number {
        return this.quantity;
    }

    toJSON() {
        return {
            recipeId: this.recipeId,
            ingredientId: this.ingredientId,
            unit: this.unit,
            quantity: this.quantity,
        };
    }

    equals(recipeIngredient: RecipeIngredient): boolean {
        return (
            this.recipeId === recipeIngredient.getRecipeId() &&
            this.ingredientId === recipeIngredient.getIngredientId() &&
            this.unit === recipeIngredient.getUnit() &&
            this.quantity === recipeIngredient.getQuantity()
        );
    }
}
