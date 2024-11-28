import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

export class RecipeIngredient {
    readonly id?: number;
    readonly amount: number;
    readonly measurementType: string;

    constructor(data: { id?: number; amount: number; measurementType: string }) {
        this.id = data.id;
        this.amount = data.amount;
        this.measurementType = data.measurementType;
    }

    static from(data: { id?: number; amount: number; measurementType: string }): RecipeIngredient {
        return new RecipeIngredient(data);
    }
}
