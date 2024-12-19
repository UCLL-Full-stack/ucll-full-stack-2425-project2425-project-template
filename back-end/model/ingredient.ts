import { Type } from "../types";
import { Ingredient as IngredientPrisma } from '@prisma/client';
export class Ingredient {

    static from({
        id,
        naam,
        type,
        aantal,
        prijs,
        ingredientLimit
    }: IngredientPrisma): Ingredient {
        return new Ingredient({
            id,
            naam,
            type,
            aantal,
            prijs,
            ingredientLimit
        });
    }


    private id?: number;
    private naam: string;
    private type: Type;
    private aantal: number;
    private prijs: number;
    private ingredientLimit: number;

    constructor(ingredient: {
        id?: number;
        naam: string;
        type: Type;
        aantal: number;
        prijs: number;
        ingredientLimit?: number;
    }) {
        this.validate(ingredient);

        this.id = ingredient.id;
        this.naam = ingredient.naam;
        this.type = ingredient.type;
        this.aantal = ingredient.aantal;
        this.prijs = ingredient.prijs;
        this.ingredientLimit = ingredient.ingredientLimit ?? 5;
    }
    validate(ingredient: { naam: string, type: Type, aantal: number, prijs: number, ingredientLimit?: number }) {
        if (!ingredient.naam) {
            throw new Error("Naam cannot be empty");
        }
        if (!ingredient.type) {
            throw new Error("Type cannot be empty");
        }
        if (!ingredient.aantal) {
            throw new Error("Aantal cannot be empty");
        }
        if (!ingredient.prijs) {
            throw new Error("Prijs cannot be empty");
        }
        if (ingredient.aantal < 0) {
            throw new Error("Aantal must be a positive number");
        }
        if (ingredient.prijs < 0) {
            throw new Error("Prijs must be a positive number");
        }
        if (ingredient.ingredientLimit) {
            if (ingredient.ingredientLimit > 15 || ingredient.ingredientLimit < 5) {
                throw new Error("Choose a number between 5 and 15");
            }
        }

    }

    getId(): number | undefined {
        return this.id;
    }

    getNaam(): string {
        return this.naam;
    }

    getType(): string {
        return this.type;
    }

    getAantal(): number {
        return this.aantal;
    }

    setAantal(aantal: number) {
        this.aantal = aantal;
    }

    getPrijs(): number {
        return this.prijs;
    }
    getIngredientLimit(): number | undefined {
        return this.ingredientLimit;
    }

    setIngredientLimit(limit: number) {

        this.ingredientLimit = limit;
    }

}