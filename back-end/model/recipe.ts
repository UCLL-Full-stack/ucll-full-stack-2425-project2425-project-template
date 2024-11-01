import { RecipeUpdateInput } from '../types';
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
    private imageUrl?: string;
    private isFavorite?: boolean;
    private notes?: string;
    private source?: string;
    private schedule?: Schedule;

    constructor(recipe: {
        id?: number;
        title: string;
        instructions: string;
        cookingTime: number;
        category: string;
        ingredients: RecipeIngredient[];
        user: User;
        imageUrl?: string;
        isFavorite?: boolean;
        notes?: string;
        source?: string;
        schedule?: Schedule;
    }) {
        if (!recipe.title) {
            throw new Error('Title is required');
        }
        if (!recipe.instructions) {
            throw new Error('Instructions are required');
        }
        if (recipe.cookingTime <= 0) {
            throw new Error('Cooking time must be greater than zero');
        }
        if (!recipe.category) {
            throw new Error('Category is required');
        }
        if (!recipe.user) {
            throw new Error('User is required');
        }

        this.id = recipe.id;
        this.title = recipe.title;
        this.instructions = recipe.instructions;
        this.cookingTime = recipe.cookingTime;
        this.category = recipe.category;
        this.ingredients = recipe.ingredients;
        this.user = recipe.user;
        this.imageUrl = recipe.imageUrl;
        this.isFavorite = recipe.isFavorite;
        this.notes = recipe.notes;
        this.source = recipe.source;
        this.schedule = recipe.schedule;
    }

    getId(): number | undefined {
        return this.id;
    }

    setId(id?: number) {
        if (id !== undefined && id <= 0) {
            throw new Error('ID must be a positive number');
        }
        this.id = id;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string) {
        if (title.trim().length === 0) {
            throw new Error('Title cannot be empty');
        }
        if (title.length > 100) {
            throw new Error('Title cannot exceed 100 characters');
        }
        this.title = title.trim();
    }

    getInstructions(): string {
        return this.instructions;
    }

    setInstructions(instructions: string) {
        if (instructions.trim().length === 0) {
            throw new Error('Instructions cannot be empty');
        }
        this.instructions = instructions.trim();
    }

    getCookingTime(): number {
        return this.cookingTime;
    }

    setCookingTime(cookingTime: number) {
        if (cookingTime <= 0) {
            throw new Error('Cooking time must be greater than zero');
        }
        this.cookingTime = cookingTime;
    }

    getCategory(): string {
        return this.category;
    }

    setCategory(category: string) {
        if (category.trim().length === 0) {
            throw new Error('Category cannot be empty');
        }
        this.category = category.trim();
    }

    getIngredients(): RecipeIngredient[] | undefined {
        return this.ingredients;
    }

    setIngredients(ingredients: RecipeIngredient[]) {
        if (ingredients.length === 0) {
            throw new Error('Recipe must have at least one ingredient');
        }
        this.ingredients = ingredients;
    }

    getUser(): User {
        return this.user;
    }

    setUser(user: User) {
        if (!user) {
            throw new Error('User cannot be null or undefined');
        }
        this.user = user;
    }

    getImageUrl(): string | undefined {
        return this.imageUrl;
    }

    setImageUrl(imageUrl?: string) {
        if (imageUrl && !this.isValidUrl(imageUrl)) {
            throw new Error('Invalid image URL');
        }
        this.imageUrl = imageUrl;
    }

    getIsFavorite(): boolean | undefined {
        return this.isFavorite;
    }

    setIsFavorite(isFavorite: boolean) {
        this.isFavorite = isFavorite;
    }

    getNotes(): string | undefined {
        return this.notes;
    }

    setNotes(notes?: string) {
        this.notes = notes ? notes.trim() : undefined;
    }

    getSource(): string | undefined {
        return this.source;
    }

    setSource(source?: string) {
        this.source = source ? source.trim() : undefined;
    }

    getSchedule(): Schedule | undefined {
        return this.schedule;
    }

    setSchedule(schedule: Schedule) {
        this.schedule = schedule;
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    updateRecipe(updateInput: RecipeUpdateInput) {
        if (updateInput.title !== undefined) {
            this.setTitle(updateInput.title);
        }
        if (updateInput.instructions !== undefined) {
            this.setInstructions(updateInput.instructions);
        }
        if (updateInput.cookingTime !== undefined) {
            this.setCookingTime(updateInput.cookingTime);
        }
        if (updateInput.category !== undefined) {
            this.setCategory(updateInput.category);
        }
        if (updateInput.ingredients !== undefined) {
            const ingredients = updateInput.ingredients.map(
                (ingredient) =>
                    new RecipeIngredient({
                        recipe: this,
                        ingredient: ingredient.ingredient,
                        unit: ingredient.unit,
                        quantity: ingredient.quantity,
                    })
            );
            this.setIngredients(ingredients);
        }
        if (updateInput.imageUrl !== undefined) {
            this.setImageUrl(updateInput.imageUrl);
        }
        if (updateInput.isFavorite !== undefined) {
            this.setIsFavorite(updateInput.isFavorite);
        }
        if (updateInput.notes !== undefined) {
            this.setNotes(updateInput.notes);
        }
        if (updateInput.source !== undefined) {
            this.setSource(updateInput.source);
        }
    }

    equals(recipe: Recipe): boolean {
        return (
            (this.title === recipe.getTitle() &&
                this.instructions === recipe.getInstructions() &&
                this.cookingTime === recipe.getCookingTime() &&
                this.category === recipe.getCategory() &&
                this.imageUrl === recipe.getImageUrl() &&
                this.isFavorite === recipe.getIsFavorite() &&
                this.notes === recipe.getNotes() &&
                this.source === recipe.getSource() &&
                (this.ingredients?.length ?? 0) === (recipe.getIngredients()?.length ?? 0) &&
                this.ingredients?.every((ingredient, index) => {
                    const otherIngredient = recipe.getIngredients()?.[index];
                    return otherIngredient !== undefined && ingredient.equals(otherIngredient);
                })) ??
            false
        );
    }
}
