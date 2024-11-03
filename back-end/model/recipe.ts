import { Tag } from './tags';
import { User } from './user';

export class Recipe {
    private _recipeId?: number;
    private _user: User;
    private _title: string;
    private _description: string;
    private _instructions: string;
    private _nutritionFacts: string;
    private _cookingTips: string;
    private _extraNotes: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _tags: Tag[];

    constructor(recipe: {
        recipeId?: number;
        user: User;
        title: string;
        description: string;
        instructions: string;
        nutritionFacts: string;
        cookingTips: string;
        extraNotes: string;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
    }) {
        this.validate(recipe);

        this._recipeId = recipe.recipeId;
        this._user = recipe.user;
        this._title = recipe.title;
        this._description = recipe.description;
        this._instructions = recipe.instructions;
        this._nutritionFacts = recipe.nutritionFacts;
        this._cookingTips = recipe.cookingTips;
        this._extraNotes = recipe.extraNotes;
        this._createdAt = recipe.createdAt;
        this._updatedAt = recipe.updatedAt;
        this._tags = recipe.tags;
    }

    public getRecipeId(): number | undefined {
        return this._recipeId;
    }

    // no setter need for the id
    
    public getUser(): User {
        return this._user;
    }

    public setUser(user: User): void {
        this._user = user;
    }

    public getTitle(): string {
        return this._title;
    }

    public setTitle(title: string): void {
        this._title = title;
    }

    public getDescription(): string {
        return this._description;
    }

    public setDescription(description: string): void {
        this._description = description;
    }

    public getInstructions(): string {
        return this._instructions;
    }

    public setInstructions(instructions: string): void {
        this._instructions = instructions;
    }

    public getNutritionFacts(): string {
        return this._nutritionFacts;
    }

    public setNutritionFact(nutritionFacts: string): void {
        this._nutritionFacts = nutritionFacts;
    }

    public getCookingTips(): string {
        return this._cookingTips;
    }

    public setCookingTips(cookingTips: string): void {
        this._cookingTips = cookingTips;
    }

    public getExtraNotes(): string {
        return this._extraNotes;
    }

    public setExtraNotes(extraNotes: string): void {
        this._extraNotes = extraNotes;
    }

    public getCreationDate(): Date {
        return this._createdAt;
    }

    public setCreationDate(): void {
        this._createdAt = new Date();
    }

    public getUpdateAt(): Date {
        return this._updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt;
    }

    public getTags(): Tag[] {
        return this._tags;
    }

    public setTags(tags: Tag[]): void {
        this._tags = tags;
    }

    private validate(recipe: {
        user: User;
        title: string;
        description: string;
        instructions: string;
        nutritionFacts: string;
        cookingTips: string;
        extraNotes: string;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
    }) {
        if (!recipe.user) {
            throw new Error('User is required');
        }
        if (!recipe.title) {
            throw new Error('Title is required');
        }
        if (!recipe.description) {
            throw new Error('Description is required');
        }
        if (!recipe.instructions) {
            throw new Error('Instructions are required');
        }
        if (!recipe.nutritionFacts) {
            throw new Error('Nutrition facts are required');
        }
        if (!recipe.cookingTips) {
            throw new Error('Cooking tips are required');
        }
        if (!recipe.extraNotes) {
            throw new Error('Extra notes are required');
        }
        if (!recipe.createdAt) {
            throw new Error('Creation date is required');
        }
        if (!recipe.updatedAt) {
            throw new Error('Update date is required');
        }
        if (!recipe.tags || recipe.tags.length === 0) {
            throw new Error('At least one tag is required');
        }
    }

    equals(recipe: Recipe): boolean {
        return (
            this._recipeId === recipe._recipeId &&
            this._user === recipe._user &&
            this._title === recipe._title &&
            this._description === recipe._description &&
            this._instructions === recipe._instructions &&
            this._nutritionFacts === recipe._nutritionFacts &&
            this._cookingTips === recipe._cookingTips &&
            this._extraNotes === recipe._extraNotes &&
            this._createdAt === recipe._createdAt &&
            this._updatedAt === recipe._updatedAt &&
            this._tags.every((tag, index) => tag.equals(recipe.getTags()[index]))
        );
    }
}
