import { Profile } from './profile';
import { Recipe } from './recipe';
import { Schedule } from './schedule';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private profile: Profile;
    private recipes?: Recipe[];
    private schedule?: Schedule;

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        profile: Profile;
        recipes?: Recipe[];
        schedule?: Schedule;
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.profile = user.profile;
        this.recipes = user.recipes || [];
        this.schedule = user.schedule;
    }

    validate(user: {
        id?: number;
        username: string;
        password: string;
        profile: Profile;
        recipes?: Recipe[];
        schedule?: Schedule;
    }): void {
        if (user.id !== undefined && (!Number.isInteger(user.id) || user.id <= 0)) {
            throw new Error('ID must be a positive integer');
        }
        if (!user.username || user.username.trim().length === 0) {
            throw new Error('Username is required and cannot be empty');
        }
        if (!user.password || user.password.trim().length === 0) {
            throw new Error('Password is required and cannot be empty');
        }
        if (!user.profile) {
            throw new Error('Profile is required');
        }
        if (user.recipes !== undefined && !Array.isArray(user.recipes)) {
            throw new Error('Recipes must be an array');
        }
        if (user.schedule !== undefined && !(user.schedule instanceof Schedule)) {
            throw new Error('Schedule must be an instance of Schedule');
        }
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

    setProfile(profile: Profile) {
        this.profile = profile;
    }

    getRecipes(): Recipe[] | undefined {
        return this.recipes;
    }

    getSchedules(): Schedule | undefined {
        return this.schedule;
    }

    addRecipe(recipe: Recipe): void {
        this.recipes?.push(recipe);
    }

    getSchedule(): Schedule | undefined {
        return this.schedule;
    }

    setSchedule(schedule: Schedule) {
        this.schedule = schedule;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            profile: this.profile ? this.profile.toJSON() : undefined,
            recipes: this.recipes ? this.recipes.map((recipe) => recipe.toJSON()) : undefined,
            schedule: this.schedule ? this.schedule.toJSON() : undefined,
        };
    }

    equals(user: User): boolean {
        return this.username === user.getUsername() && this.password === user.getPassword();
    }
}
