import { IngredientCategory } from '../types';
import {
    Ingredient as IngredientPrisma,
    IngredientCategory as CategoryPrisma,
} from '@prisma/client';

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
        this.validate(ingredient);
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.category = ingredient.category;
        this.store = ingredient.store;
    }

    validate(ingredient: {
        id?: number;
        name: string;
        category: IngredientCategory;
        store?: string;
    }) {
        if (
            ingredient.id !== undefined &&
            (!Number.isInteger(ingredient.id) || ingredient.id <= 0) // temporary Id validation
        ) {
            throw new Error('Invalid id');
        }
        if (!ingredient.name) {
            throw new Error('Name is required');
        }
        if (ingredient.store !== undefined && typeof ingredient.store !== 'string') {
            throw new Error('Store must be a string');
        }
        if (!ingredient.category) {
            throw new Error('Category is required');
        }
    }

    static from({
        id,
        name,
        category,
        store,
    }: IngredientPrisma & {
        category: CategoryPrisma;
    }): Ingredient {
        return new Ingredient({
            id,
            name,
            category: category as IngredientCategory,
            store: store || undefined,
        });
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
