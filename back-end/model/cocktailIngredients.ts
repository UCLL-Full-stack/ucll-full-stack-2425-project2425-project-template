import { Cocktail } from "./cocktail";
import { Ingredient } from "./ingredient";

export class CocktailIngredient {
    private _id?: number;
    private _cocktailId!: number;
    private _ingredientId!: number;
    private _amount!: string;

    constructor(id: number, cocktailId: number, ingredientId: number, amount: string) {
        this._id = id;
        this._cocktailId = cocktailId;
        this._ingredientId = ingredientId;
        this._amount = amount;
    }

    public get id(): number | undefined {
        return this._id;
    }
    public get cocktailId(): number {
        return this._cocktailId;
    }
    public get ingredientId(): number {
        return this._ingredientId;
    }
    public get amount(): string {
        return this._amount;
    }

    public set id(value: number | undefined) {
        this._id = value;
    }
    public set cocktailId(value: number) {
        this._cocktailId = value;
    }
    public set ingredientId(value: number) {
        this._ingredientId = value;
    }
    public set amount(value: string) {
        this._amount = value;
    }
}