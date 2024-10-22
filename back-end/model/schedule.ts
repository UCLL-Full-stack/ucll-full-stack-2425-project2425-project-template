import { User } from './user';
import { Recipe } from './recipe';

export class Schedule {
    private id?: number;
    private user: User;
    private date: Date;
    private recipes?: Recipe[];

    constructor(schedule: { id?: number; user: User; date: Date; recipes?: Recipe[] }) {
        this.id = schedule.id;
        this.user = schedule.user;
        this.date = schedule.date;
        this.recipes = schedule.recipes || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getDate(): Date {
        return this.date;
    }

    getRecipes(): Recipe[] | undefined {
        return this.recipes;
    }

    // Add recipe
    // Check if a meal with the same name already exists for that date
    // Future implementation: Multiple recipes can be schedule for one day
    addRecipe(recipe: Recipe): void {
        this.recipes?.push(recipe);
        recipe.addSchedule(this);
    }
}
