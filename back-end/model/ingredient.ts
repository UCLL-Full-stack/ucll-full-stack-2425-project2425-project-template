import { IngredientCategory } from '../types';
import { RecipeIngredient } from './recipeIngredient';

export class Ingredient {
    private id?: number;
    private name: string;
    private category: IngredientCategory;
    private store?: string;
    private recipes: RecipeIngredient[];

    constructor(ingredient: {
        id?: number;
        name: string;
        category: IngredientCategory;
        store?: string;
        recipes: RecipeIngredient[];
    }) {
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.category = ingredient.category;
        this.store = ingredient.store;
        this.recipes = ingredient.recipes;
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

    getRecipes(): RecipeIngredient[] {
        return this.recipes;
    }

    equals(ingredient: Ingredient): boolean {
        return (
            this.name === ingredient.getName() &&
            this.category === ingredient.getCategory() &&
            this.store === ingredient.getStore()
        );
    }
}
