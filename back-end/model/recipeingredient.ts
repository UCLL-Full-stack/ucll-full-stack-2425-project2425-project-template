import {Ingredient} from "./ingredient";

export class RecipeIngredient {
    private _recipeIngredientId?: number;
    private _recipeId: number;
    private _ingredientId: number;
    private _unit: string;
    private _quantity: number;
    private ingredient: Ingredient;


    constructor(recipeIngredient: {
        recipeIngredientId?: number;
        recipeId: number;
        ingredientId: number;
        unit: string;
        quantity: number;
        ingredient: Ingredient
    }) {
        this._recipeIngredientId = recipeIngredient.recipeIngredientId;
        this._recipeId = recipeIngredient.recipeId;
        this._ingredientId = recipeIngredient.ingredientId;
        this._unit = recipeIngredient.unit;
        this._quantity = recipeIngredient.quantity;
        this.ingredient = recipeIngredient.ingredient;
    }

    getRecipeIngredientId(): number| undefined {
        return this._recipeIngredientId;
    }

    getRecipeId(): number {
        return this._recipeId;
    }

    getIngredientId(): number {
        return this._ingredientId;
    }

    getUnit(): string {
        return this._unit;
    }

    getQuantity(): number {
        return this._quantity;
    }

    getIngredient():Ingredient {
        return this.ingredient;
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

