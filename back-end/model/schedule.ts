import { User } from './user';
import { Recipe } from './recipe';
import {
    Schedule as SchedulePrisma,
    // User as UserPrisma,
    Recipe as RecipePrisma,
    RecipeIngredient as RecipeIngredientPrisma,
} from '@prisma/client';

export class Schedule {
    private id?: number;
    // private user: User;
    private createdAt: Date;
    private recipes?: Recipe[];

    constructor(schedule: { id?: number; date: Date; recipes?: Recipe[] }) {
        this.validate(schedule);
        this.id = schedule.id;
        // this.user = schedule.user;
        this.createdAt = schedule.date;
        this.recipes = schedule.recipes || [];
    }

    static from({
        id,
        createdAt,
        recipes,
    }: SchedulePrisma & {
        recipes: (RecipePrisma & { ingredients: RecipeIngredientPrisma[] })[];
    }): Schedule {
        const schedule = new Schedule({
            id,
            date: new Date(createdAt),
            recipes: [], // Initialize with an empty array
        });
        schedule.setRecipes(recipes.map((recipe) => Recipe.from(recipe)));
        return schedule;
    }

    validate(schedule: { id?: number; date: Date; recipes?: Recipe[] }): void {
        if (schedule.id !== undefined && (!Number.isInteger(schedule.id) || schedule.id <= 0)) {
            throw new Error('ID must be a positive integer');
        }
        // if (!schedule.user) {
        //     throw new Error('User is required');
        // }
        if (!(schedule.date instanceof Date)) {
            throw new Error('Date must be a valid Date object');
        }
        if (schedule.recipes !== undefined && !Array.isArray(schedule.recipes)) {
            throw new Error('Recipes must be an array');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    // getUser(): User {
    //     return this.user;
    // }

    // setUser(user: User) {
    //     this.user = user;
    // }

    getDate(): Date {
        return this.createdAt;
    }

    getRecipes(): Recipe[] | undefined {
        return this.recipes;
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
    }

    addRecipe(recipe: Recipe) {
        const existingRecipe = this.recipes?.find((r) => r.getTitle() === recipe.getTitle());
        if (existingRecipe) {
            throw new Error(
                `A recipe with the name "${recipe.getTitle()}" is already scheduled for this date`
            );
        }

        this.recipes?.push(recipe);
    }

    removeRecipe(recipe: Recipe) {
        // returns -1 if index not found
        const index = this.recipes?.findIndex((r) => r.getId() === recipe.getId());
        if (index !== undefined && index !== -1) {
            this.recipes?.splice(index, 1);
            recipe.setScheduledDate(null);
        }
    }

    hasRecipe(recipe: Recipe): boolean | undefined {
        return this.recipes?.some((r) => r.getId() === recipe.getId());
    }

    toJSON() {
        return {
            id: this.id,
            // user: this.user.getId(),
            createdAt: this.createdAt,
            recipes: this.recipes?.map((recipe) => recipe.toJSON()),
        };
    }
}
