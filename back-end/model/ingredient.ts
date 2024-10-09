import { IngredientCategory } from '../types';

export class Ingredient {
    private id?: number;
    private name: string;
    private category: IngredientCategory;
    private store?: string;

    constructor(ingredient: {
        id?: number;
        name: string;
        category: IngredientCategory;
        store?: string;
    }) {
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.category = ingredient.category;
        this.store = ingredient.store;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCategory(): IngredientCategory {
        return this.category;
    }

    getStore(): string | undefined {
        return this.store;
    }

    equals(ingredient: Ingredient): boolean {
        return (
            this.name === ingredient.getName() &&
            this.category === ingredient.getCategory() &&
            this.store === ingredient.getStore()
        );
    }
}
