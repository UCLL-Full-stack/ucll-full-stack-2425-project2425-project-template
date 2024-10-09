import { User } from './user';
import { Recipe } from './recipe';

export class Schedule {
    private id?: number;
    private user: User;
    private date: Date;
    private recipe: Recipe;

    constructor(schedule: { id?: number; user: User; date: Date; recipe: Recipe }) {
        this.id = schedule.id;
        this.user = schedule.user;
        this.date = schedule.date;
        this.recipe = schedule.recipe;
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

    getRecipe(): Recipe {
        return this.recipe;
    }

    // Add recipe
    // Check if a meal with the same name already exists for that date
    // Future implementation: Multiple recipes can be schedule for one day
    addRecipe(date: Date, recipe: Recipe) {
        if (
            this.date.getTime() === date.getTime() &&
            this.recipe.getTitle() === recipe.getTitle()
        ) {
            return 'A meal with this name already exists on the selected date.';
        }

        this.date = date;
        this.recipe = recipe;
    }
}
