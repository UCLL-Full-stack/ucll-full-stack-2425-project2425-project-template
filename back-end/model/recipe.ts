import { RecipeIngredient } from './recipeIngredient';
import { Schedule } from './schedule';
import { User } from './user';

export class Recipe {
    private id?: number;
    private title: string;
    private instructions: string;
    private cookingTime: number;
    private category: string; // flexible for custom categories
    private ingredients?: RecipeIngredient[]; // do i make it optional? '?'
    private user: User;
    private schedules?: Schedule[];

    constructor(recipe: {
        id?: number;
        title: string;
        instructions: string;
        cookingTime: number;
        category: string;
        ingredients: RecipeIngredient[];
        user: User;
        schedules?: Schedule[];
    }) {
        this.id = recipe.id;
        this.title = recipe.title;
        this.instructions = recipe.instructions;
        this.cookingTime = recipe.cookingTime;
        this.category = recipe.category;
        this.ingredients = recipe.ingredients;
        this.user = recipe.user;
        this.schedules = recipe.schedules || [];
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

    getIngredients(): RecipeIngredient[] | undefined {
        return this.ingredients;
    }

    getUser(): User {
        return this.user;
    }

    getSchedules(): Schedule[] | undefined {
        return this.schedules;
    }

    addSchedule(schedule: Schedule): void {
        this.schedules?.push(schedule);
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
