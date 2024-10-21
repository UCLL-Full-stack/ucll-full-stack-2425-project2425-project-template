import { RecipeIngredient } from './recipeIngredient';

export class Recipe {
    private id?: number;
    private title: string;
    private instructions: string;
    private cookingTime: number;
    private category: string; // flexible for custom categories
    private ingredients: RecipeIngredient[];

    constructor(recipe: {
        id?: number;
        title: string;
        instructions: string;
        cookingTime: number;
        category: string;
        ingredients: RecipeIngredient[];
    }) {
        this.id = recipe.id;
        this.title = recipe.title;
        this.instructions = recipe.instructions;
        this.cookingTime = recipe.cookingTime;
        this.category = recipe.category;
        this.ingredients = recipe.ingredients;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getInstructions(): string {
        return this.instructions;
    }

    getCookingTime(): number {
        return this.cookingTime;
    }

    getCategory(): string {
        return this.category;
    }

    getIngredients(): RecipeIngredient[] {
        return this.ingredients;
    }

    equals(recipe: Recipe): boolean {
        return (
            this.title === recipe.getTitle() &&
            this.instructions === recipe.getInstructions() &&
            this.cookingTime === recipe.getCookingTime() &&
            this.category === recipe.getCategory()
        );
    }
}
