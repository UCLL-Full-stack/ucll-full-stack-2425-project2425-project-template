import { RecipeIngredient } from '@prisma/client';
import { User } from './User';
import { Review } from './Review';

export class Recipe {
    id?: number;
    name: string;
    description: string;
    recipeIngredients: RecipeIngredient[]; // Dit is een RecipeIngredient prisma object en geen Ingredient object
    creator: User;
    reviews: Review[];

    constructor(data: {
        id?: number;
        name: string;
        description: string;
        recipeIngredients: RecipeIngredient[];
        creator: User;
        reviews?: Review[];
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.recipeIngredients = data.recipeIngredients;
        this.creator = data.creator;
        this.reviews = data.reviews || [];
    }

    validate(recipe: { id?: number, name: string, description: string, recipeIngredients: RecipeIngredient[], creator: User }) {
        if (!recipe.name) {
            throw new Error("Recipe name is required");
        }

        if (recipe.name.length < 3) {
            throw new Error("Recipe name needs to be at least 3 characters long");
        }

        if (!recipe.description) {
            throw new Error("Description is required");
        }

        // Validate each ingredient if necessary
        recipe.recipeIngredients.forEach(recipeIngredient => {
            if (!recipeIngredient.amount) {
                throw new Error("Ingredient amount is required");
            }
            if (!recipeIngredient.measurementType) {
                throw new Error("Ingredient measurement type is required");
            }
        });
    }

    equals(recipe: Recipe): boolean {
        return this.name === recipe.name && this.description === recipe.description;
    }
}
