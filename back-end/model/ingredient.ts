import {
    Ingredient as IngredientPrisma
} from '@prisma/client'

export class Ingredient {
    private id?: number;
    private name: string;

    constructor(ingredient: { id?: number; name: string;
    }) {
        this.id = ingredient.id;
        this.name = ingredient.name;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }

    equals(other: Ingredient): boolean {
        return this.id === other.id &&
               this.name === other.name
    }

    static from({ id, name }: IngredientPrisma): Ingredient {
        return new Ingredient({id, name});
    }
}
