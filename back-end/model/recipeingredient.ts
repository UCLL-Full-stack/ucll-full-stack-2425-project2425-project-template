export class RecipeIngredient {
    private recipeingredientId?: number;
    private recipeId: number;
    private ingredientId: number;
    private unit: string;
    private quantity: number;

    constructor(recipeingredient: { recipeingredientId?: number; recipeId: number; ingredientId: number; unit: string; quantity: number; }) {
        this.recipeingredientId = recipeingredient.ingredientId;
        this.recipeId = recipeingredient.recipeId;
        this.ingredientId = recipeingredient.ingredientId;
        this.unit = recipeingredient.unit;
        this.quantity = recipeingredient.quantity;
    }

    /**
    equals({ recipeingredientId, recipeId, ingredientId, unit, quantity }): boolean {
        return (
            this.recipeingredientId === recipeingredientId &&
            this.recipeId === recipeId &&
            this.ingredientId === ingredientId &&
            this.unit === unit &&
            this.quantity === quantity
        )
    }
    */
}

