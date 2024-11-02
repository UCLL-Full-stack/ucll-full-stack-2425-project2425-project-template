import { IngredientCategory } from '../types';
import { RecipeIngredient } from './recipeIngredient';

export class Ingredient {
    private id?: number;
    private name: string;
    private category: IngredientCategory;
    private store?: string;
    private recipes?: RecipeIngredient[];

    constructor(ingredient: {
        id?: number;
        name: string;
        category: IngredientCategory;
        store?: string;
        recipes?: RecipeIngredient[];
    }) {
        this.validate(ingredient);
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.category = ingredient.category;
        this.store = ingredient.store;
        this.recipes = ingredient.recipes;
    }

    validate(ingredient: {
        id?: number;
        name: string;
        category: IngredientCategory;
        store?: string;
        recipes?: RecipeIngredient[];
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

    getRecipes(): RecipeIngredient[] | undefined {
        return this.recipes;
    }

    setRecipes(recipes: RecipeIngredient[]) {
        this.recipes = recipes;
    }

    equals(ingredient: Ingredient): boolean {
        return (
            this.name === ingredient.getName() &&
            this.category === ingredient.getCategory() &&
            this.store === ingredient.getStore()
        );
    }
}
