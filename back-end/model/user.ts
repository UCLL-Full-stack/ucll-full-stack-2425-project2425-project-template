import { Profile } from './profile';
import { Recipe } from './recipe';
import { Schedule } from './schedule';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private profile: Profile;
    private recipes?: Recipe[];
    private schedules?: Schedule[];

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        profile: Profile;
        recipes?: Recipe[];
        schedules?: Schedule[];
    }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.profile = user.profile;
        this.recipes = user.recipes || [];
        this.schedules = user.schedules || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile {
        return this.profile;
    }

    getRecipes(): Recipe[] | undefined {
        return this.recipes;
    }

    getSchedules(): Schedule[] | undefined {
        return this.schedules;
    }

    addRecipe(recipe: Recipe): void {
        this.recipes?.push(recipe);
    }

    addSchedule(schedule: Schedule): void {
        this.schedules?.push(schedule);
    }

    equals(user: User): boolean {
        return this.username === user.getUsername() && this.password === user.getPassword();
    }
}
